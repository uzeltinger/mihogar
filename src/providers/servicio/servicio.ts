import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'/*,
        'Authorization': this.user.token ? 'Bearer ' + this.user.token : ''*/
      })
    };
  }
  
}
