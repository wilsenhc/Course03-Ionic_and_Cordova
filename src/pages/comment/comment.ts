import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Comment } from '../../shared/comment';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment = this.fb.group({
    author: ['', Validators.required],
    rating: [1, Validators.required],
    comment: ['', Validators.required],
  });

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private fb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss(data = null, role = 'cancel') {
    const dismiss = this.viewCtrl.dismiss(data, role);
  }

  onSubmit() {
    const date = new Date();
    const dateString = date.toISOString();

    const comment: Comment = {
      ...this.comment.value,
      date: dateString,
    };

    this.dismiss(comment, 'add-comment');
  }

}
