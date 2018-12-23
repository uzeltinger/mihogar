import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../models/property';
import { isNullOrUndefined } from 'util';
import { SessionProvider } from '../../providers/session/session';

/**
 * Generated class for the PropertyEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-property-edit',
  templateUrl: 'property-edit.html',
})
export class PropertyEditPage {
  property:Property;
  myForm: FormGroup;
  cities: any;
  categories: any;
  showSplash: boolean = true;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder, 
    public sessionData: SessionProvider,
    public navParams: NavParams) {
      this.getCategories();
      this.getCities();
      this.property = navParams.data.property;

      if(isNullOrUndefined(this.property)){
        this.property = new Property({});
      }    

    console.log('this.property', this.property);
    this.myForm = this.createMyForm();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyEditPage');
  }

  private createMyForm(){
    //agent_id
    console.log('this.property',this.property);
    return this.formBuilder.group({
      pro_name: [this.property.pro_name, Validators.required],
      category_id: [this.property.category_id, Validators.required],
      pro_type: [this.property.pro_type, Validators.required],
      lastName: ['', Validators.required],
      published: [this.property.published, Validators.required],
      bath_room: [this.property.bath_room, Validators.required],
      bed_room: [this.property.bed_room, Validators.required],
      city: [this.property.city, Validators.required],
      curr: [this.property.curr, Validators.required],
      price: [this.property.price, Validators.required],
      image: [this.property.image, Validators.required],
      parking: [this.property.parking, Validators.required],
      pro_full_desc: [this.property.pro_full_desc, Validators.required],
      pro_small_desc: [this.property.pro_small_desc, Validators.required],
      ref: [this.property.ref, Validators.required],
      rooms: [this.property.rooms, Validators.required],
    });
  }

  saveData(){
    console.log(this.myForm.value);
  }

  getCities() {
    this.cities = this.sessionData.getCiudades();
    //this.cities.forEach((valor: any) => {    });    
    console.log('this.cities', this.cities);
    this.showSplash = false;
  }

  getCategories() {
    this.categories = this.sessionData.getCategorias();
    //this.categories.forEach((valor: any) => {    });
    console.log('this.categories', this.categories);
    this.showSplash = false;
  }

}
