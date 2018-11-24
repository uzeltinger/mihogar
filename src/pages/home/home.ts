import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { AgentPropertiesListPage } from '../agent-properties-list/agent-properties-list';
import { PropertyPage } from '../property/property';
import { ModalSearchPage } from '../modal-search/modal-search';
import { SessionProvider } from '../../providers/session/session';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  showSplash: boolean;
  properties: any;
  items: any = [];
  offersLimitStart: number = 0;
  offersLimit: number = 10;
  offersShowAll: boolean = false;
  whatsappText: string
  filtrosAplicados: boolean = false;
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  priceRangeValue = { lower: 50000, upper: 200000 };
  alquilerRangeValue = { lower: 5000, upper: 20000 };
  dormitoriosValue: number = 0;
  ambientesValue: number = 0;
  typeSelected: number = 2;
  priceRangeValueApplied: boolean = false;
  alquilerRangeValueApplied: boolean = false;
  ciudadesById: any = [];
  categoriasById: any = [];

  constructor(public navCtrl: NavController,
    private alertController: AlertController,
    public modalCtrl: ModalController,
    public sessionData: SessionProvider,
    public proveedor: ServicioProvider) {
    this.whatsappText = "Hola.%0AEstoy%20interesado%20en%20esta%20propiedad.%0AGracias.%0A";

    this.getCategories();
    this.getCities();

  }

  getCities() {
    this.proveedor.getCities()
      .subscribe(
        (data) => {
          console.log('getCities', data);
          this.sessionData.setCiudades(data);
          let cities: any = data;
          let ciudadesById: any = [];
          cities.forEach((valor: any) => {
            ciudadesById[valor.city_id] = valor;
          });
          this.sessionData.setCiudadesById(ciudadesById);
          this.ciudadesById = ciudadesById;
        },
        (error) => { console.log('error', error); }
      )
  }

  getCategories() {
    this.proveedor.getCategories()
      .subscribe(
        (data) => {
          console.log('getCategories', data);
          this.sessionData.setCategorias(data);
          let categories: any = data;
          let categoriasById: any = [];
          categories.forEach((valor: any) => {
            categoriasById[valor.id] = valor;
          });
          this.sessionData.setCategoriasById(categoriasById);
          this.categoriasById = categoriasById;
        },
        (error) => { console.log('error', error); }
      )
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.obtenerFiltrosAplicados();
    this.getProperties();
    this.showSplash = true;
  }

  obtenerFiltrosAplicados() {
    this.getCitiesFiltered();
    this.getCategoriesFiltered();
    this.getPriceRangeValue();
    this.getAlquilerRangeValue();
    this.getDormitoriosValue();
    this.getAmbientesValue();
    this.getTypeSelected();
    this.priceRangeValueApplied = false;
    this.alquilerRangeValueApplied = false;
    /*
        console.log('this.citiesFiltered length',this.citiesFiltered.length);
        console.log('this.categoriesFiltered length',this.categoriesFiltered.length);
        console.log('this.citiesFiltered',this.citiesFiltered);
        console.log('this.categoriesFiltered',this.categoriesFiltered);
        console.log('this.typeSelected',this.typeSelected);
        console.log('this.priceRangeValue',this.priceRangeValue);
        console.log('this.alquilerRangeValue',this.alquilerRangeValue);
        console.log('this.dormitoriosValue',this.dormitoriosValue);
        console.log('this.ambientesValue',this.ambientesValue);
    */
    if (this.citiesFiltered != null && this.categoriesFiltered.length > 0) {
      this.filtrosAplicados = true; console.log('citiesFiltered');
    }
    if (this.categoriesFiltered != null && this.categoriesFiltered.length > 0) {
      this.filtrosAplicados = true; console.log('categoriesFiltered');
    }
    if (this.typeSelected != null && this.typeSelected > 0) {
      this.filtrosAplicados = true; console.log('typeSelected');
    }
    if (this.priceRangeValue != null) {
      if (this.priceRangeValue.lower == 50000 && this.priceRangeValue.upper == 200000) {
      } else {
        this.filtrosAplicados = true; console.log('priceRangeValue');
        this.priceRangeValueApplied = true;
      }
    }
    if (this.alquilerRangeValue != null) {
      if (this.alquilerRangeValue.lower == 5000 && this.alquilerRangeValue.upper == 20000) {
      } else {
        this.filtrosAplicados = true; console.log('alquilerRangeValue');
        this.alquilerRangeValueApplied = true;
      }
    }
    if (this.dormitoriosValue != null && this.dormitoriosValue > 0) {
      this.filtrosAplicados = true; console.log('dormitoriosValue');
    }
    if (this.ambientesValue != null && this.ambientesValue > 0) {
      this.filtrosAplicados = true; console.log('ambientesValue');
    }
    if (this.filtrosAplicados) {
      this.ciudadesById = this.sessionData.getCiudadesById();
      console.log('this.ciudadesById', this.ciudadesById);
    }
  }

  getProperties() {
    this.showSplash = true;
    //let sendData = {"cities":this.citiesFiltered,"categories":this.categoriesFiltered,"latitude":this.latitude,"longitude":this.longitude,"limit":this.offersLimit,"limitstart": this.offersLimitStart};
    let sendData = {
      "limit": this.offersLimit,
      "limitstart": this.offersLimitStart,
      "isFeatured": 1,
      "cities": null,
      "categories": null,
      "type": 0,
      "ambientes": null,
      "dormitorios": null,
      "priceRange": {"lower":null, "upper":null},
      "alquilerRange": {"lower":null, "upper":null}
    };
    if (this.citiesFiltered != null && this.categoriesFiltered.length > 0) {
      sendData.cities = this.citiesFiltered;
    }
    if (this.categoriesFiltered != null && this.categoriesFiltered.length > 0) {
      sendData.categories = this.categoriesFiltered;
    }
    if (this.typeSelected != null && this.typeSelected > 0) {
      sendData.type = this.typeSelected;
    }
    if (this.ambientesValue != null && this.ambientesValue > 0) {
      sendData.ambientes = this.ambientesValue;
    }
    if (this.dormitoriosValue != null && this.dormitoriosValue > 0) {
      sendData.dormitorios = this.dormitoriosValue;
    }
    if(this.priceRangeValueApplied){
      sendData.priceRange.lower = this.priceRangeValue.lower;
      sendData.priceRange.upper = this.priceRangeValue.upper;
    }
    if(this.alquilerRangeValueApplied){
      sendData.alquilerRange.lower = this.alquilerRangeValue.lower;
      sendData.alquilerRange.upper = this.alquilerRangeValue.upper;
    }
    console.log('sendData', sendData);

    this.proveedor.getProperties(sendData)
      .subscribe(
        (data) => {
          console.log('getProperties', data);
          this.properties = data;
          if (this.properties.length < this.offersLimit) {
            this.offersShowAll = true;
          }

          this.properties.forEach(element => {
            element.bath_room = parseInt(element.bath_room);
            if (element.mobile == '') {
              element.mobile = "1130190242";
            }
            element.link = "http://diportal.com.ar/component/osproperty/" + element.ref + "-" + element.pro_alias + "-" + element.id + ".html"

            element.price = parseInt(element.price);
            element.price = element.price.toLocaleString('es-AR');
            if (element.curr == 1) {
              element.moneda = "$";
            } else {
              element.moneda = "u$s";
            }
            this.items.push(element);
          });

          this.properties = data;
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;

          this.showAlert('Ocurrió un error', error);
        }
      )
  }

  eliminarFiltro(tipo: string, objeto: any) {
    console.log('tipo', tipo);
    console.log('objeto', objeto);
    switch (tipo) {

      case 'city':
        let a = this.citiesFiltered.indexOf(objeto);
        if (a != -1) {
          this.citiesFiltered.splice(a, 1);
        }
        break;

      case 'category':
        let c = this.categoriesFiltered.indexOf(objeto);
        if (c != -1) {
          this.categoriesFiltered.splice(c, 1);
        }
        break;

      case 'ambientesValue':
        this.ambientesValue = 0;
        break;

      case 'dormitoriosValue':
        this.dormitoriosValue = 0;
        break;

      case 'typeSelected':
        this.typeSelected = 0;
        break;

      case 'priceRangeValue':
        this.priceRangeValue = null;
        this.priceRangeValueApplied = false;
        break;

      case 'alquilerRangeValue':
        this.alquilerRangeValue = null;
        this.alquilerRangeValueApplied = false;
        break;

      default:
        break;

    }
    this.actualizarFiltros();
    this.getProperties();
  }

  increaseWhatsappClick(property) {
    console.log('increaseWhatsappClick');
    this.proveedor.increaseWhatsappClick(property)
      .subscribe(
        data => {
          console.log('increaseWhatsappClick data: ', data);
        },
        error => {
          console.log('increaseWhatsappClick error: ', error);
        }
      );
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    return new Promise((resolve) => {
      this.offersLimitStart += this.offersLimit;
      console.log('this.offersLimitStart', this.offersLimitStart);
      if (!this.offersShowAll) {
        this.getProperties();
      }
      setTimeout(() => {
        resolve();
      }, 1000);
    })
  }

  navToPropertyPage(event, property) {
    this.navCtrl.push(PropertyPage, {
      property: property
    });
  }

  navToAgentPropertiesListPage(event, property) {
    this.navCtrl.push(AgentPropertiesListPage, {
      property: property
    });
  }

  showAlert(title_: string, subTitle_: string) {
    const alert = this.alertController.create({
      title: title_,
      subTitle: subTitle_,
      buttons: ['OK']
    });
    alert.present();
  }

  presentModal() {
    /*if(this.filtrosAplicados){
      this.showSplash = true;
      this.limpiarFiltros();    
    }else{  */
    const modal = this.modalCtrl.create(ModalSearchPage);
    modal.onDidDismiss(data => {
      console.log(data);
      this.showSplash = true;
      this.obtenerFiltrosAplicados();
      this.getProperties();
    });
    modal.present();
    this.showSplash = true;
    /*}*/
  }

  getCitiesFiltered() {
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = null;
    } else {
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
    //console.log('this.citiesFiltered',this.citiesFiltered);   
  }

  getCategoriesFiltered() {
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = null;
    } else {
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
    //console.log('this.categoriesFiltered',this.categoriesFiltered);   
  }

  getPriceRangeValue() {
    if (localStorage.getItem("priceRangeValue") === null) {
      this.priceRangeValue = null;
    } else {
      this.priceRangeValue = JSON.parse(localStorage.getItem("priceRangeValue"));
    }
    //console.log('priceRangeValue',this.priceRangeValue);   
  }

  getAlquilerRangeValue() {
    if (localStorage.getItem("alquilerRangeValue") === null) {
      this.alquilerRangeValue = null;
    } else {
      this.alquilerRangeValue = JSON.parse(localStorage.getItem("alquilerRangeValue"));
    }
    //console.log('alquilerRangeValue',this.alquilerRangeValue);   
  }

  getDormitoriosValue() {
    if (localStorage.getItem("dormitoriosValue") === null) {
      this.dormitoriosValue = null;
    } else {
      this.dormitoriosValue = JSON.parse(localStorage.getItem("dormitoriosValue"));
    }
    //console.log('dormitoriosValue',this.dormitoriosValue);   
  }

  getAmbientesValue() {
    if (localStorage.getItem("ambientesValue") === null) {
      this.ambientesValue = null;
    } else {
      this.ambientesValue = JSON.parse(localStorage.getItem("ambientesValue"));
    }
    //console.log('ambientesValue',this.ambientesValue);   
  }

  getTypeSelected() {
    if (localStorage.getItem("typeSelected") === null) {
      this.typeSelected = null;
    } else {
      this.typeSelected = JSON.parse(localStorage.getItem("typeSelected"));
    }
    //console.log('typeSelected',this.typeSelected);   
  }

  limpiarFiltros() {
    this.citiesFiltered = [];
    this.categoriesFiltered = [];
    this.setCitiesFiltered();
    this.setCategoriesFiltered();
    this.getProperties();
  }
  setCitiesFiltered() {
    localStorage.setItem("citiesFiltered", JSON.stringify(this.citiesFiltered))
    //console.log('citiesFiltered',this.citiesFiltered);    
  }
  setCategoriesFiltered() {
    localStorage.setItem("categoriesFiltered", JSON.stringify(this.categoriesFiltered))
    //console.log('categoriesFiltered',this.categoriesFiltered);    
  }
  actualizarFiltros(){    
    localStorage.setItem("citiesFiltered", JSON.stringify(this.citiesFiltered));
    localStorage.setItem("categoriesFiltered", JSON.stringify(this.categoriesFiltered));
    localStorage.setItem("priceRangeValue", JSON.stringify(this.priceRangeValue));
    localStorage.setItem("alquilerRangeValue", JSON.stringify(this.alquilerRangeValue));
    localStorage.setItem("dormitoriosValue", JSON.stringify(this.dormitoriosValue));
    localStorage.setItem("ambientesValue", JSON.stringify(this.ambientesValue));
    localStorage.setItem("typeSelected", JSON.stringify(this.typeSelected));
  }
}