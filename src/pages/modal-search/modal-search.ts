import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { FormControl, FormGroup } from '@angular/forms';


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
  //allCategories: any;
  //allCities: any;
  categoriesFiltered: any = [];
  citiesFiltered: any = [];
  showSplash = true;
  filtro: any = {'categories':"","cities":""};

 
  priceRangeValue = {lower: 50000, upper: 200000};
  alquilerRangeValue = {lower: 5000, upper: 20000};
  dormitoriosValue: number = 0;
  ambientesValue: number = 0;
  typeSelected: number = 2;

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

  setType(type){
    this.typeSelected = type;
  }


  getCities(){
    this.proveedor.getCities()
    .subscribe(
      (data)=> {  
        console.log('data',data);       
        this.cities = data; 
        this.cities.forEach((valor : any) => {
          //console.log('valor.id',valor.city);
          let a = this.citiesFiltered.indexOf(valor.city);
          if(a!=-1){            
            valor.isAssigned = true;          
          }else{
            valor.isAssigned = false;
          }
          
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
        this.categories = data; 
        this.categories.forEach((valor : any) => {
          let a = this.categoriesFiltered.indexOf(valor.id);
          if(a!=-1){            
            valor.isAssigned = true;          
          }else{
            valor.isAssigned = false;
          }
          
        });
        this.showSplash = false;
      },
      (error)=>{console.log('error',error);}
    )
  }

  toggleCategory(category){  
    console.log('togglecategory',category);
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    }else{
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }    
    if(category.isAssigned){
      console.log('category.isAssigned',category.isAssigned);      
        let a = this.categoriesFiltered.indexOf(category.id);
        console.log('aaaaaaaaaaa',a);
        if(a!=-1){            
          var removed = this.categoriesFiltered.splice(a, 1);
        }     
    }
    if(!category.isAssigned){
      console.log('!category.isAssigned',category.isAssigned);
      let b = this.categoriesFiltered.indexOf(category.id);
      if(b==-1){            
        this.categoriesFiltered.push(category.id);   
      }      
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

    if(city.isAssigned){
      console.log('city.isAssigned',city.isAssigned);   
      let a = this.citiesFiltered.indexOf(city.city_id);
        console.log('aaaaaaaaaaa',a);
        if(a!=-1){            
          var removed = this.citiesFiltered.splice(a, 1);
        }         
    }
    if(!city.isAssigned){
      console.log('!city.isAssigned',city.isAssigned);
      this.citiesFiltered.push(city.city_id);  
      let b = this.citiesFiltered.indexOf(city.city_id);
      if(b==-1){            
        this.citiesFiltered.push(city.city_id);   
      }    
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






/*
  rangeCtrl = new FormControl({value: '66', disabled: true});
  dualRangeCtrl = new FormControl({value: {lower: 33, upper: 60}, disabled: true});

  rangeForm = new FormGroup({
    'range': this.rangeCtrl,
    'dualRange': this.dualRangeCtrl
  });
*/
  
/*
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

  */
  
}
