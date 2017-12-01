import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IResultRecherche } from '../home/home';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  info: IResultRecherche;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = navParams.get('info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
