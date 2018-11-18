import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

/*
  Generated class for the ProvidersServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioProvider {
  //apiUrl: string = 'http://diportal.local/';
  apiUrl: string = 'http://diportal.com.ar/';
  httpOptions: any = {};
  constructor(public httpClient: HttpClient) {
    console.log('Hello ProvidersServicioProvider Provider');
  }
  getProperties(data) {
    this.httpOptions = this.getHeader();
    let params: string = "";
    if(data.limit){
      params = params + "&limmit="+data.limit;
    }
    if(data.limitstart){
      params = params + "&limitstart="+data.limitstart;
    }
    if(data.isFeatured){
      params = params + "&isFeatured="+data.isFeatured;
    }
    
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties'+params;
    console.log('url',url);
    return this.httpClient.get(url);
  }
  getAgentProperties(agent_id) {
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties&agent_id='+agent_id;
    return this.httpClient.get(url);
  }

  getProperty(id) {
    this.httpOptions = this.getHeader();
    let params: string = "";    
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_property&id='+id;
    console.log('url',url);
    return this.httpClient.get(url);
  }

  increaseWhatsappClick(property: any): Observable<any> {
    console.log('offer', property);
    this.httpOptions = this.getHeader();
    return this.httpClient.post<any>(this.apiUrl + "index.php?option=com_osproperty&task=api_whatsappaddclick", property.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategories() {
    let url = '';
    url = this.apiUrl + 'index.php?option=com_osproperty&task=json_categories';
    return this.httpClient.get(url);
  }

  getCities() {
    let url = '';
    url = this.apiUrl + 'index.php?option=com_osproperty&task=json_cities';
    return this.httpClient.get(url);
  }
  
  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'/*,
        'Authorization': this.user.token ? 'Bearer ' + this.user.token : ''*/
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
