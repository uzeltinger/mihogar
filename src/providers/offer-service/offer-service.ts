import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
/*
  Generated class for the OfferServiceProvider provider.throwError 

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OfferServiceProvider {
  httpOptions: any = {};
  apiUrl: string = 'https://mioferta.com.ar/api';
  //apiUrl: string = 'http://mioferta.local/api';  
  conectadoAinternet: boolean = true;
  categoryFiltered: number = 0;

  constructor(public httpClient: HttpClient,
    public storage: Storage) {
    console.log('Hello OfferServiceProvider Provider');
  }

  setConectadoAinternet(conectadoAinternet) {
    console.log('ProveedorProvider setConectadoAinternet', conectadoAinternet);
    this.conectadoAinternet = conectadoAinternet;
  }
  getConectadoAinternet() {
    return this.conectadoAinternet;
  }
  setCategoryFiltered(category){
    this.categoryFiltered = category;
    console.log('this.categoryFiltered', this.categoryFiltered);
  }
  getCategoryFiltered(){
    console.log('this.categoryFiltered', this.categoryFiltered);
    return this.categoryFiltered;
  }
  obtenerCategoriasDeOfertas(){
    return this.httpClient.get('https://mioferta.com.ar/mihogarcupones/categoriasAplicadas.php', this.httpOptions);
  }
  
  obtenerOfertas(data: any): Observable<any> {
    if (this.conectadoAinternet) {      
      this.httpOptions = this.getHeader();
      if(this.categoryFiltered>0){
        data.categories = [];
        data.categories.push(this.categoryFiltered);
        console.log('obtenerOfertas data', data);
      }
      return this.httpClient.post<any>(this.apiUrl + "/v1/offers/getMiHogarOffers", data, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    } else {
      let error: Response | any;
      error = 'No estás conectado a internet';
      return Observable.throw(error);
    }

  }

  increaseWhatsappClick(offer: any): Observable<any> {
    console.log('offer', offer);
    this.httpOptions = this.getHeader();
    return this.httpClient.post<any>(this.apiUrl + "/v1/offer/increaseWhatsappClick", offer.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
