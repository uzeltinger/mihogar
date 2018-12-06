import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoritesProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {
    this.getStoredFavorites();
    let b = this.favorites.indexOf(id);
      if (b == -1) {
        this.favorites.push(id);
      }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    console.log('this.favorites',this.favorites);    
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(){
    return this.favorites;
  }

  getStoredFavorites() {
    if (localStorage.getItem("favorites") === null) {
      this.favorites = [];
    } else {
      this.favorites = JSON.parse(localStorage.getItem("favorites"));
    }
    return this.favorites;
  }  

}
