import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServicioProvider {
  //apiUrl: string = 'http://diportal.local/';
  apiUrl: string = 'http://diportal.com.ar/';
  httpOptions: any = {};
  constructor(public httpClient: HttpClient) {
    //console.log('Hello ProvidersServicioProvider Provider');
  }
  getPropertiesWhatsapp(){
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties_whatsapp';
    console.log('url',url);
    return this.httpClient.get(url);
  }
  getProperties(data) {    
    this.httpOptions = this.getHeader();
    let params: string = "";
    if(data.limit){
      params = params + "&limit="+data.limit;
    }
    if(data.limitstart){
      params = params + "&limitstart="+data.limitstart;
    }
    if(data.isFeatured){
      params = params + "&isFeatured="+data.isFeatured;
    }
    if(data.agent_id){
      params = params + "&agent_id="+data.agent_id;
    }
    if(data.cities){
      params = params + "&cities="+data.cities;
    }
    if(data.categories){
      params = params + "&categories="+data.categories;
    }
    if(data.type){
      params = params + "&type="+data.type;
    }
    if(data.ambientes){
      params = params + "&ambientes="+data.ambientes;
    }
    if(data.dormitorios){
      params = params + "&dormitorios="+data.dormitorios;
    }
    if(data.priceRange){
      params = params + "&priceRange="+data.priceRange.lower+"-"+data.priceRange.upper;
    }
    if(data.alquilerRange){
      params = params + "&alquilerRange="+data.alquilerRange.lower+"-"+data.alquilerRange.upper;
    }
    
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties'+params;
    console.log('url',url);
    return this.httpClient.get(url);
  }
  getAgentProperties(data) {
    let params: string = "";
    if(data.limit){
      params = params + "&limit="+data.limit;
    }
    if(data.limitstart){
      params = params + "&limitstart="+data.limitstart;
    }
    if(data.agent_id){
      params = params + "&agent_id="+data.agent_id;
    }
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties'+params;
    console.log('url',url);
    return this.httpClient.get(url);
  }

  getProperty(id) {
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_property&id='+id;
    //console.log('url',url);
    return this.httpClient.get(url);
  }

  getLastVersion(){    
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_getLastVersion';
    return this.httpClient.get(url);
  }

  increaseWhatsappClick(property: any): Observable<any> {
    //console.log('offer', property);
    this.httpOptions = this.getHeader();
    return this.httpClient.post<any>(this.apiUrl + "index.php?option=com_osproperty&task=api_whatsappaddclick", property.id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCompany(company: any): Observable<any> {
    console.log('company', company);
    this.httpOptions = this.getHeader();
    return this.httpClient.post<any>(this.apiUrl + "index.php?option=com_osproperty&task=api_addCompany", company, this.httpOptions)
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
