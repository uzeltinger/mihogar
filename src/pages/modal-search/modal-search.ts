import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { SessionProvider } from '../../providers/session/session';

@IonicPage()
@Component({
  selector: 'page-modal-search',
  templateUrl: 'modal-search.html',
})
export class ModalSearchPage {

  categories: any = [];
  cities: any = [];
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  showSplash = true;
  //filtro: any = {'categories':"","cities":""}; 
  priceRangeValue = { lower: 50000, upper: 200000 };
  alquilerRangeValue = { lower: 5000, upper: 20000 };
  dormitoriosValue: number = 0;
  ambientesValue: number = 0;
  typeSelected: number = 2;

  constructor(public navCtrl: NavController,
    public proveedor: ServicioProvider,
    public navParams: NavParams,
    public sessionData: SessionProvider,
    public viewCtrl: ViewController) {
      this.getCategories();
      this.getCities();
  }

  ionViewDidLoad() {
    //localStorage.clear();
    this.citiesFiltered = [];
    this.categoriesFiltered = [];
    //this.setCitiesFiltered();
    //this.setCategoriesFiltered();
    this.getCitiesFiltered();
    this.getCategoriesFiltered();
    this.getPriceRangeValue();
    this.getAlquilerRangeValue();
    this.getDormitoriosValue();
    this.getAmbientesValue();
    this.getTypeSelected();
  }

  setType(type) {
    this.typeSelected = type;
    this.limpiarFiltros();
  }

  getCities() {
    this.cities = this.sessionData.getCiudades();
    this.cities.forEach((valor: any) => {
      let a = this.citiesFiltered.indexOf(valor.city_id);
      if (a != -1) {
        valor.isAssigned = true;
      } else {
        valor.isAssigned = false;
      }
    });    
    console.log('this.cities', this.cities);
    this.showSplash = false;
  }

  getCategories() {
    this.categories = this.sessionData.getCategorias();
    this.categories.forEach((valor: any) => {
      let a = this.categoriesFiltered.indexOf(valor.id);
      if (a != -1) {
        valor.isAssigned = true;
      } else {
        valor.isAssigned = false;
      }
    });
    console.log('this.categories', this.categories);
    this.showSplash = false;
  }

  toggleCategory(category) {
    console.log('togglecategory', category);
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    } else {
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
    if (category.isAssigned) {
      console.log('category.isAssigned', category.isAssigned);
      let a = this.categoriesFiltered.indexOf(category.id);
      console.log('aaaaaaaaaaa', a);
      if (a != -1) {
        var removed = this.categoriesFiltered.splice(a, 1);
      }
    }
    if (!category.isAssigned) {
      console.log('!category.isAssigned', category.isAssigned);
      let b = this.categoriesFiltered.indexOf(category.id);
      if (b == -1) {
        this.categoriesFiltered.push(category.id);
      }
    }
    this.setCategoriesFiltered();
  }

  toggleCity(city) {
    console.log('toggleCity', city);
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    } else {
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
    if (city.isAssigned) {
      console.log('city.isAssigned', city.isAssigned);
      let a = this.citiesFiltered.indexOf(city.city_id);
      console.log('aaaaaaaaaaa', a);
      if (a != -1) {
        var removed = this.citiesFiltered.splice(a, 1);
      }
    }
    if (!city.isAssigned) {
      console.log('!city.isAssigned', city.isAssigned);
      this.citiesFiltered.push(city.city_id);
      let b = this.citiesFiltered.indexOf(city.city_id);
      if (b == -1) {
        this.citiesFiltered.push(city.city_id);
      }
    }
    this.setCitiesFiltered();
  }

  changeAmbientes() { }
  changeDormitorios() { }
  changeAlquilerPrice() { }
  changePrice() { }

  getCitiesFiltered() {
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    } else {
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
  }

  getCategoriesFiltered() {
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    } else {
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
  }

  setCitiesFiltered() {
    localStorage.setItem("citiesFiltered", JSON.stringify(this.citiesFiltered))
  }

  setCategoriesFiltered() {
    localStorage.setItem("categoriesFiltered", JSON.stringify(this.categoriesFiltered))
  }

  getPriceRangeValue() {
    if (localStorage.getItem("priceRangeValue") === null) {
      this.priceRangeValue = { lower: 50000, upper: 200000 };
    } else {
      this.priceRangeValue = JSON.parse(localStorage.getItem("priceRangeValue"));
    }
  }
  getAlquilerRangeValue() {
    if (localStorage.getItem("alquilerRangeValue") === null) {
      this.alquilerRangeValue = { lower: 5000, upper: 20000 };
    } else {
      this.alquilerRangeValue = JSON.parse(localStorage.getItem("alquilerRangeValue"));
    }
  }
  getDormitoriosValue() {
    if (localStorage.getItem("dormitoriosValue") === null) {
      this.dormitoriosValue = 0;
    } else {
      this.dormitoriosValue = JSON.parse(localStorage.getItem("dormitoriosValue"));
    }
  }
  getAmbientesValue() {
    if (localStorage.getItem("ambientesValue") === null) {
      this.ambientesValue = 0;
    } else {
      this.ambientesValue = JSON.parse(localStorage.getItem("ambientesValue"));
    }
  }
  getTypeSelected() {
    if (localStorage.getItem("typeSelected") === null) {
      this.typeSelected = 0;
    } else {
      this.typeSelected = JSON.parse(localStorage.getItem("typeSelected"));
    }
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    localStorage.setItem("priceRangeValue", JSON.stringify(this.priceRangeValue));
    localStorage.setItem("alquilerRangeValue", JSON.stringify(this.alquilerRangeValue));
    localStorage.setItem("dormitoriosValue", JSON.stringify(this.dormitoriosValue));
    localStorage.setItem("ambientesValue", JSON.stringify(this.ambientesValue));
    localStorage.setItem("typeSelected", JSON.stringify(this.typeSelected));
    this.viewCtrl.dismiss(data);
  }

  limpiarFiltros() {
    //this.categoriesFiltered = [];
    //this.citiesFiltered = [];
    this.priceRangeValue = { lower: 50000, upper: 200000 };
    this.alquilerRangeValue = { lower: 5000, upper: 20000 };
    //this.dormitoriosValue = 0;
    //this.ambientesValue = 0;
  }

}