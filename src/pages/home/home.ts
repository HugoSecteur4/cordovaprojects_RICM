import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { api_key } from '../../app/tmdb';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { AlertController, Platform } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';

export interface IResultRecherche {
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}


// const liste: IResultRecherche[] = [{ title: "denis", overview: "denis l'auteur", poster_path:"http://lorempixel.com/400/200/"},
//                                        { title: "damien", overview: "damien l'auteur", poster_path: "http://lorempixel.com/400/200/" },
//                                        { title: "dimitri", overview: "dimitri l'auteur", poster_path: "http://lorempixel.com/400/200/" }];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private platform: Platform, private navCtrl: NavController, private http: HttpClient, private alertCtrl: AlertController, private shake: Shake) {
    this.getItems();


   }

  ionViewDidEnter() {
    this.shakeSubscription = Observable.fromPromise(this.platform.ready())
    .switchMap(() => this.shake.startWatch())
    .switchMap(() => this.fetchResult2018())
    .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave() {
    this.shakeSubscription.unsubscribe();
  }
  shakeSubscription: Subscription;
  liste: Observable<IResultRecherche[]>;
  query: string = "";

  getItems() {

    if (this.query) {
      this.liste = this.fetchResult();
      //this.liste.forEach(poster_path => "https://image.tmdb.org/t/p/w500/"+poster_path);
    } else {
      this.liste = Observable.of([]);
    }
  }


  push(item: IResultRecherche):void {
    this.navCtrl.push(DetailsPage, {info:item});
  }

  fetchResult(): Observable<IResultRecherche[]> {

    return this.http.get<IResultRecherche[]>("https://api.themoviedb.org/3/search/movie", {
      params: new HttpParams().set("api_key",api_key).set("query",this.query).set("language", "fr")
    }).pluck("results");
  }

  fetchResult2018(): Observable<IResultRecherche[]> {

    return this.http.get<IResultRecherche[]>("https://api.themoviedb.org/3/discover/movie", {
      params: new HttpParams().set("api_key", api_key).set("primary_release_year", "2018").set("language", "fr")
    }).pluck("results");
  }

  showRandomMovieAlert(movies: IResultRecherche[]): void {
    let rand = Math.floor(Math.random()*movies.length);
    let alert = this.alertCtrl.create({
      title: 'titre de test',
      message: 'Message',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('cancel click');
          }
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage, { info: movies[rand] });
          }
        }
      ]
    });
    alert.present();
  }




}
