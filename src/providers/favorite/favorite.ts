import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage,
    private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');

    // TASK 2: Initialize favorites at startup
    this.storage.get('favorites').then(favorites => {
      this.favorites = favorites ? favorites : [];
    });

    // Schedule a single notification
    this.localNotifications.schedule({
      text: 'Dish added as a favorite successfully'
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);

      this.storage.set('favorites', this.favorites);
    }
    console.log('favorites', this.favorites);

    // Schedule a single notification
    this.localNotifications.schedule({
      id: id,
      text: 'Dish ' + id + ' added as a favorite successfully'
    });

    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {

    // Schedule a single notification
    this.localNotifications.schedule({
      id: Math.random(),
      text: 'Dish added as a favorite successfully'
    });

    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
