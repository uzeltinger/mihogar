import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionProvider {
  categorias: any = [];
  tipos: any = [];
  ciudades: any = [];
  ciudadesById: any = [];
  categoriasById: any = [];
  conectadoAinternet: boolean = false;

  constructor(public http: HttpClient) {
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
}