import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionProvider {
  categorias: any = [];
  tipos: any = [];
  ciudades: any = [];
  ciudadesById: any = [];
  categoriasById: any = [];
  conectadoAinternet: boolean = false;
  user: any;
  isUserLogued: boolean = false;

  private userIsLoggedIn = new Subject<boolean>();
  public userEmitter = this.userIsLoggedIn.asObservable();

  userEmitChange(usr: boolean) {
      this.userIsLoggedIn.next(usr);
  }

  constructor(public http: HttpClient,
    private storage: Storage) {
    //console.log('Hello SessionProvider Provider');
  }
  setCategorias(categorias){
    this.categorias = categorias;
  } 
  getCategorias(){
    return this.categorias;
  }
  setCiudades(ciudades){
    this.ciudades = ciudades;
  }
  getCiudades(){
    return this.ciudades;
  }
  setTipos(tipos){
    this.tipos = tipos;
  } 
  getTipos(){
    return this.tipos;
  }
  setCiudadesById(ciudadesById){
    this.ciudadesById = ciudadesById;
  }
  getCiudadesById(){
    return this.ciudadesById;
  }
  setCategoriasById(categoriasById){
    this.categoriasById = categoriasById;
  }
  getCategoriasById(){
    return this.categoriasById;
  }
  setConectadoAinternet(conectadoAinternet) {
    console.log('ProveedorProvider setConectadoAinternet', conectadoAinternet);
    this.conectadoAinternet = conectadoAinternet;
  }
  getConectadoAinternet() {
    return this.conectadoAinternet;
  }
  setUserLogued(user){
    this.user = user;
    this.isUserLogued = true;
    this.userEmitChange(true);
    this.storage.set('user', JSON.stringify(user));
    console.log('setUserLogued user', user);
  }
  setUserLogout(){
    this.user = null;
    this.isUserLogued = false;
    this.userEmitChange(false);
    this.storage.set('user', null);
    console.log('setUserLogued user', null);
  }
  getUserLogued() {
    if(!isNullOrUndefined(this.user)){
      return this.user;
      console.log('isNullOrUndefined');
    }
    console.log('getUserLogued this.user', this.user);
    this.storage.get('user').then((val) => {
      if(val!=null){
        this.user = JSON.parse(val);
        this.userEmitChange(true);
      }
      return this.user;
    });
  }  
}