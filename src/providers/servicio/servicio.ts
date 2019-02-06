import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ServicioProvider {
  token: string = null;
  //apiUrl: string = 'http://diportal.local/';
  apiUrl: string = 'https://diportal.com.ar/';
  urlInmobiliaria: string = 'inmobiliaria.diportal.com.ar/';
  urlInmobiliariaDefault: string = 'inmobiliaria.diportal.com.ar/';
  //apiLoginUrl: string = 'http://inmobiliaria.diportal.local/';
  httpOptions: any = {};
  //urlInmobiliaria: string;
  constructor(public httpClient: HttpClient, private storage: Storage) {
    //console.log('Hello ProvidersServicioProvider Provider');
  }

  getUrlInmobiliaria(): Promise<any> {
    return this.storage.get('urlInmobiliaria');
  }
  setUrlInmobiliaria(urlInmobiliaria) {
    if(!isNullOrUndefined(urlInmobiliaria)){
      this.urlInmobiliaria = urlInmobiliaria;       
      this.storage.set('urlInmobiliaria', urlInmobiliaria);
    }else{
      this.urlInmobiliaria = this.urlInmobiliariaDefault;       
      this.storage.set('this.urlInmobiliariaDefault', this.urlInmobiliariaDefault);
    }
   
  }
  getMyProperties(user) {
    this.token = user.hash;
    this.httpOptions = this.getHeader();
    //return this.httpClient.post<any>(this.apiLoginUrl + "index.php?option=com_api&app=mihogar&resource=login&format=raw", dateSend, this.httpOptions)
    let url = 'https://'+this.urlInmobiliaria + '/index.php?option=com_api&app=mihogar&resource=mispropiedades&format=raw';
    console.log('url', url);
    return this.httpClient.get(url, this.httpOptions);
  }

  getPropertiesWhatsapp(agent_id) {
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties_whatsapp';
    if (agent_id > 0) {
      url = url + "&agent_id=" + agent_id;
    }
    console.log('url', url);
    return this.httpClient.get(url);
  }
  getProperties(data) {
    this.httpOptions = this.getHeader();
    let params: string = "";
    if (data.limit) {
      params = params + "&limit=" + data.limit;
    }
    if (data.limitstart) {
      params = params + "&limitstart=" + data.limitstart;
    }
    if (data.isFeatured) {
      params = params + "&isFeatured=" + data.isFeatured;
    }
    if (data.agent_id) {
      params = params + "&agent_id=" + data.agent_id;
    }
    if (data.cities) {
      params = params + "&cities=" + data.cities;
    }
    if (data.categories) {
      params = params + "&categories=" + data.categories;
    }
    if (data.type) {
      params = params + "&type=" + data.type;
    }
    if (data.ambientes) {
      params = params + "&ambientes=" + data.ambientes;
    }
    if (data.dormitorios) {
      params = params + "&dormitorios=" + data.dormitorios;
    }
    if (data.priceRange) {
      params = params + "&priceRange=" + data.priceRange.lower + "-" + data.priceRange.upper;
    }
    if (data.alquilerRange) {
      params = params + "&alquilerRange=" + data.alquilerRange.lower + "-" + data.alquilerRange.upper;
    }

    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties' + params;
    console.log('url', url);
    return this.httpClient.get(url);
  }
  getAgentProperties(data) {
    let params: string = "";
    if (data.limit) {
      params = params + "&limit=" + data.limit;
    }
    if (data.limitstart) {
      params = params + "&limitstart=" + data.limitstart;
    }
    if (data.agent_id) {
      params = params + "&agent_id=" + data.agent_id;
    }
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_properties' + params;
    console.log('url', url);
    return this.httpClient.get(url);
  }

  getProperty(id) {
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_property&id=' + id;
    //console.log('url',url);
    return this.httpClient.get(url);
  }

  getLastVersion() {
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_getLastVersion';
    return this.httpClient.get(url, this.httpOptions);
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

  getFavorites(favorites) {
    this.httpOptions = this.getHeader();
    let url = this.apiUrl + 'index.php?option=com_osproperty&task=json_favorites&favoritos=' + favorites;
    console.log('url', url);
    return this.httpClient.get(url);
  }

  saveProperty(property: any): Observable<any> {
    this.httpOptions = this.getHeader();
    return this.httpClient.post('https://'+this.urlInmobiliaria + "/index.php?option=com_api&app=mihogar&resource=property&format=raw", property, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(dateSend) {
    this.urlInmobiliaria = dateSend.urlInmobiliaria;
    this.storage.set('urlInmobiliaria', this.urlInmobiliaria);
    console.log('login dateSend.urlInmobiliaria', dateSend.urlInmobiliaria);

    if (dateSend.urlInmobiliaria != "") {
      this.urlInmobiliaria = dateSend.urlInmobiliaria;
    }else{
      this.urlInmobiliaria = this.urlInmobiliariaDefault
    }
    this.httpOptions = this.getHeader();
    return this.httpClient.post<any>('https://' + this.urlInmobiliaria + "/index.php?option=com_api&app=mihogar&resource=login&format=raw", dateSend, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    this.httpOptions = this.getHeader();
    this.token = null;
    return this.httpClient.get('https://'+
    this.urlInmobiliaria + "/index.php?option=com_api&app=mihogar&resource=logout&format=raw", this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHeader() {
    console.log('token', this.token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token ? 'Bearer ' + this.token : ''
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
