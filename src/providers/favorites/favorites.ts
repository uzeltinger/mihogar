import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritesProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient,
    private storage: Storage) {
    console.log('Hello FavoritesProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {    
    this.favorites.push(id);    
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    console.log('this.favorites', this.favorites);
    this.storage.set('favorites', JSON.stringify(this.favorites));         
    return true;
  }

  removeFavorite(id: number): boolean {    
    const index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites() {
    return this.favorites;
  }

  getStoredFavorites() {
    console.log('getStoredFavorites');
    this.storage.get('favorites').then((val) => {
      console.log('Your favorites is', val);
      this.favorites = JSON.parse(val);
    });
  }
}