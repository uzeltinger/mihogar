import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';

@IonicPage()
@Component({
  selector: 'page-modal-search',
  templateUrl: 'modal-search.html',
})
export class ModalSearchPage {

  categories: any;
  cities: any;
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
    //localStorage.clear();
    console.log('ionViewDidLoad ModalSearchPage');
    this.citiesFiltered = [];
    this.categoriesFiltered = [];
    //this.setCitiesFiltered();
    //this.setCategoriesFiltered();
    this.getCitiesFiltered();
    this.getCategoriesFiltered();
    this.getCategories();
    this.getCities();
    this.getPriceRangeValue();
    this.getAlquilerRangeValue();
    this.getDormitoriosValue();
    this.getAmbientesValue();
    this.getTypeSelected();
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
          let a = this.citiesFiltered.indexOf(valor.city_id);
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
  
  changeAmbientes(){}
  changeDormitorios(){}
  changeAlquilerPrice(){}
  changePrice(){}

  getCitiesFiltered(){
    if (localStorage.getItem("citiesFiltered") === null) {
      this.citiesFiltered = [];
    }else{
      this.citiesFiltered = JSON.parse(localStorage.getItem("citiesFiltered"));
    }
    console.log('citiesFiltered',this.citiesFiltered);   
  }

  getCategoriesFiltered(){
    if (localStorage.getItem("categoriesFiltered") === null) {
      this.categoriesFiltered = [];
    }else{
      this.categoriesFiltered = JSON.parse(localStorage.getItem("categoriesFiltered"));
    }
    console.log('categoriesFiltered',this.categoriesFiltered);    
  }

  setCitiesFiltered(){    
    localStorage.setItem("citiesFiltered", JSON.stringify(this.citiesFiltered))
    console.log('citiesFiltered',this.citiesFiltered);    
  }

  setCategoriesFiltered(){    
    localStorage.setItem("categoriesFiltered", JSON.stringify(this.categoriesFiltered))
    console.log('categoriesFiltered',this.categoriesFiltered);    
  }

  getPriceRangeValue(){
    if (localStorage.getItem("priceRangeValue") === null) {
      this.priceRangeValue = {lower: 50000, upper: 200000};
    }else{
      this.priceRangeValue = JSON.parse(localStorage.getItem("priceRangeValue"));
    }
    console.log('priceRangeValue',this.priceRangeValue);   
  }
  getAlquilerRangeValue(){
    if (localStorage.getItem("alquilerRangeValue") === null) {
      this.alquilerRangeValue = {lower: 5000, upper: 20000};
    }else{
      this.alquilerRangeValue = JSON.parse(localStorage.getItem("alquilerRangeValue"));
    }
    console.log('alquilerRangeValue',this.alquilerRangeValue);   
  }
  getDormitoriosValue(){
    if (localStorage.getItem("dormitoriosValue") === null) {
      this.dormitoriosValue = 0;
    }else{
      this.dormitoriosValue = JSON.parse(localStorage.getItem("dormitoriosValue"));
    }
    console.log('dormitoriosValue',this.dormitoriosValue);   
  }
  getAmbientesValue(){
    if (localStorage.getItem("ambientesValue") === null) {
      this.ambientesValue = 0;
    }else{
      this.ambientesValue = JSON.parse(localStorage.getItem("ambientesValue"));
    }
    console.log('ambientesValue',this.ambientesValue);   
  }
  getTypeSelected(){
    if (localStorage.getItem("typeSelected") === null) {
      this.typeSelected = 0;
    }else{
      this.typeSelected = JSON.parse(localStorage.getItem("typeSelected"));
    }
    console.log('typeSelected',this.typeSelected);   
  }

  dismiss() { 
    let data = { 'foo': 'bar' };
    console.log('priceRangeValue',this.priceRangeValue);
    console.log('alquilerRangeValue',this.alquilerRangeValue);
    console.log('dormitoriosValue',this.dormitoriosValue);
    console.log('ambientesValue',this.ambientesValue);
    console.log('typeSelected',this.typeSelected);
    localStorage.setItem("priceRangeValue", JSON.stringify(this.priceRangeValue));
    localStorage.setItem("alquilerRangeValue", JSON.stringify(this.alquilerRangeValue));
    localStorage.setItem("dormitoriosValue", JSON.stringify(this.dormitoriosValue));
    localStorage.setItem("ambientesValue", JSON.stringify(this.ambientesValue));
    localStorage.setItem("typeSelected", JSON.stringify(this.typeSelected));
    this.viewCtrl.dismiss(data);
  }
 
}