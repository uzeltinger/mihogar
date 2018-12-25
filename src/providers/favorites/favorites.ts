import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritesProvider {

  favorites: any = [];

  constructor(public http: HttpClient,
    private storage: Storage) {
    //console.log('Hello FavoritesProvider Provider');
    this.favorites = [];
  }

  addFavorite(id: number): boolean {    
    this.favorites.push(id);    
    //localStorage.setItem("favorites", JSON.stringify(this.favorites));
    //console.log('this.favorites', this.favorites);
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
    //console.log('this.favorites',this.favorites);
    if(this.favorites!=null){
      return this.favorites.some(el => el === id);
    }    
  }

  getFavorites() {
    return this.favorites;
  }

  getStoredFavorites() {
    //console.log('getStoredFavorites');
    this.storage.get('favorites').then((val) => {
      if(val!=null){
        this.favorites = JSON.parse(val);
      }    
      //console.log('Your favorites is', val);  
    });
  }
}