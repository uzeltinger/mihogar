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
  conectadoAinternet: boolean = false;

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

  obtenerOfertas(data: any): Observable<any> {
    if (this.conectadoAinternet) {
      console.log('obtenerOfertas data', data);
      this.httpOptions = this.getHeader();
      return this.httpClient.post<any>(this.apiUrl + "/v1/offers/getOffers", data, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    } else {
      let error: Response | any;
      error = 'No estás conectado a internet';
      return Observable.throw(error);
    }

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
