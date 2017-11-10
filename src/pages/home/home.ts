import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

interface IResultRecherche {
  title: string;
  author: string;
  date: string;
  image: string;
}

const liste: IResultRecherche[] = [{ title: "denis", author: "denis l'auteur", date: "29 février 2018", image:"http://lorempixel.com/400/200/"},
                                       { title: "damien", author: "damien l'auteur", date: "31 octobre 1944", image: "http://lorempixel.com/400/200/" },
                                       { title: "dimitri", author: "dimitri l'auteur", date: "27 septembre 2012", image: "http://lorempixel.com/400/200/" }];

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  liste: IResultRecherche[] = liste;
  query: string = "";

  getItems(ev: any) {
    console.log(this.query);
  }


}
