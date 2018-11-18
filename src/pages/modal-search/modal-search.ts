import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';


/**
 * Generated class for the ModalSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-search',
  templateUrl: 'modal-search.html',
})
export class ModalSearchPage {

  categories: any;
  cities: any;
  allCategories: any;
  allCities: any;
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  showSplash = true;
  filtro: any = {'categories':"","cities":""};

  constructor(public navCtrl: NavController, 
    public proveedor: ServicioProvider,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSearchPage');
    this.citiesFiltered = [];
    this.categoriesFiltered = [];
    this.setCitiesFiltered();
    this.setCategoriesFiltered();
    this.getCategories();
    this.getCities();

  }




  getCities(){
    this.proveedor.getCities()
    .subscribe(
      (data)=> {  
        console.log('data',data);       
        this.allCities = data; 
        this.allCities.forEach((valor : any) => {
          //console.log('valor.id',valor.city);
          let a = this.citiesFiltered.indexOf(valor.city);
          //if(a!=-1){            valor.isAssigned = true;          }
          valor.isAssigned = false;
          //console.log('a',a);          
        });
        this.showSplash = false;
        //console.log('cities',data) ;
      },
      (error)=>{console.log('error',error);}
    )
  }

  getCategories(){
    this.proveedor.getCategories()
    .subscribe(
      (data)=> {
        console.log('categories',data);     
        this.allCategories = data; 
        this.allCategories.forEach((valor : any) => {
          let a = this.categoriesFiltered.indexOf(valor.id);
          if(a!=-1){            valor.isAssigned = true;          }    
          valor.isAssigned = false;
        });
        this.showSplash = false;
      },
      (error)=>{console.log('error',error);}
    )
  }

  toggleCategoryMULTIPLE(category){
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    }else{
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
    if(category.isAssigned){
      let existe:boolean = false;
      this.categoriesFiltered.forEach((valor : any) => {
        if(valor==category.id){
          existe = true;
        }        
      });
      if(!existe){
        this.categoriesFiltered.push(category.id);
      }
    }else{
      let newCategoriesFiltered = [];
      this.categoriesFiltered.forEach((valor : any) => {
        if(valor!=category.id){
          newCategoriesFiltered.push(valor);
        }
      });
      this.categoriesFiltered = newCategoriesFiltered;
    }
    this.setCategoriesFiltered();
  }

  toggleCategory(category){  
    console.log('togglecategory',category);
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    }else{
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }    
    this.categoriesFiltered = [];
    this.categories.forEach((valor : any) => {
      if(valor.id!=category.id){
        console.log('valor',valor);
        valor.isAssigned = false;         
      }           
    });    
    if(category.isAssigned){
      console.log('category.isAssigned',category.isAssigned);
      this.categoriesFiltered = [];     
    }
    if(!category.isAssigned){
      console.log('!category.isAssigned',category.isAssigned);
      this.categoriesFiltered.push(category.id);   
    }
    this.setCategoriesFiltered();
  }

  toggleCity(city){  
    console.log('toggleCity',city);
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    }else{
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }    
    this.citiesFiltered = [];
    this.cities.forEach((valor : any) => {
      if(valor.city!=city.city){
        console.log('valor city ',valor.city + " - " + city.city);
        valor.isAssigned = false;         
      }
    });

    if(city.isAssigned){
      console.log('city.isAssigned',city.isAssigned);   
      this.citiesFiltered = [];        
    }
    if(!city.isAssigned){
      console.log('!city.isAssigned',city.isAssigned);
      this.citiesFiltered.push(city.city);   
    }

    this.setCitiesFiltered();
  }

  toggleCityMULTIPLES(city){  
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    }else{
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
    if(city.isAssigned){
      let existe:boolean = false;
      this.citiesFiltered.forEach((valor : any) => {
        if(valor==city.city){
          existe = true;
        }        
      });
      if(!existe){
        this.citiesFiltered.push(city.city);
      }
    }else{
      let newCitiesFiltered = [];
      this.citiesFiltered.forEach((valor : any) => {
        if(valor!=city.city){
          newCitiesFiltered.push(valor);
        }
      });
      this.citiesFiltered = newCitiesFiltered;
    }
    this.setCitiesFiltered();
  }

  getCitiesFiltered(){
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    }else{
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
  }

  getCategoriesFiltered(){
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    }else{
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
  }

  setCitiesFiltered(){    
    localStorage.setItem("citiesFiltered", JSON.stringify(this.citiesFiltered))
    console.log('citiesFiltered',this.citiesFiltered);    
  }

  setCategoriesFiltered(){    
    localStorage.setItem("categoriesFiltered", JSON.stringify(this.categoriesFiltered))
    console.log('categoriesFiltered',this.categoriesFiltered);    
  }

  dismiss() { 
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  onSubmitSaveFilters(form){
    console.log('form',form);
    let datos = form.form.value;
    console.log('datos',datos);

    this.citiesFiltered = datos.cities;
    this.categoriesFiltered = datos.categories;
    this.setCitiesFiltered();
    this.setCategoriesFiltered();

    console.log('filtro',this.filtro);
    console.log('cities',this.cities);
    console.log('allCategories',this.allCategories);
    console.log('allCities',this.allCities);
    console.log('categoriesFiltered',this.categoriesFiltered);




  }
  
}
