import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProvidersServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioProvider {
  apiUrl: string = 'http://diportal.local/';
  constructor(public httpClient: HttpClient) {
    console.log('Hello ProvidersServicioProvider Provider');
  }
  getProperties() {
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties';
    return this.httpClient.get(url);
  }
}
