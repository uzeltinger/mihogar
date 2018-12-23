import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../models/property';
import { isNullOrUndefined } from 'util';
import { SessionProvider } from '../../providers/session/session';
import { ServicioProvider } from '../../providers/servicio/servicio';

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
  property: Property;
  myForm: FormGroup;
  ciudades: any;
  categories: any;
  showSplash: boolean = true;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public sessionData: SessionProvider,
    public toastCtrl: ToastController,
    public servicioProvider: ServicioProvider,
    public navParams: NavParams) {
    this.getCategories();
    this.getCities();
    this.property = navParams.data.property;



    if (isNullOrUndefined(this.property)) {
      this.property = new Property({});
    } else {
      let bath_room:string = this.property.bath_room.toString();
      this.property.bath_room = parseInt(bath_room);
      if (this.property.mobile == '') {
        this.property.mobile = "1130190242";
      }
      this.property.link = "http://diportal.com.ar/component/osproperty/" + this.property.ref + "-" + this.property.pro_alias + "-" + this.property.id + ".html"
      this.property.whatsappLink = "http://mihogar.net.ar/propiedad/" + this.property.id + ".html";
      this.property.price = parseInt(this.property.price.toString());
      
      

    }

    console.log('this.property', this.property);
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyEditPage');
  }

  private createMyForm() {
    //agent_id
    console.log('this.property', this.property);
    return this.formBuilder.group({
      id: [this.property.id, Validators.required],
      pro_name: [this.property.pro_name, Validators.required],
      category_id: [this.property.category_id, Validators.required],
      pro_type: [this.property.pro_type, Validators.required],
      published: [this.property.published, Validators.required],
      bath_room: [this.property.bath_room, Validators.required],
      bed_room: [this.property.bed_room, Validators.required],
      city: [this.property.city, Validators.required],
      curr: [this.property.curr, Validators.required],
      price: [this.property.price, Validators.required],
      //image: [this.property.image],
      parking: [this.property.parking, Validators.required],
      pro_small_desc: [this.property.pro_small_desc],
      ref: [this.property.ref, Validators.required],
      rooms: [this.property.rooms, Validators.required],
      address: [this.property.address, Validators.required],
    });
  }

  saveData() {
    this.showSplash = true;
    console.log('this.myForm.value',this.myForm.value);
    let dataSend = this.myForm.value;
    console.log('dataSend: ', dataSend);
    this.servicioProvider.saveProperty(dataSend)
      .subscribe(
        data => {
          if(data.data == 'saved'){
            this.showToast('Guardada');
          }else{
            this.showToast('Error guardando');
          }
          this.showSplash = false;
          
          console.log('saveProperty data: ', data);
        },
        error => {
          this.showToast('Error guardando');
          this.showSplash = false;
          console.log('saveProperty error: ', error);
        }
      );
  }

  getCities() {
    this.ciudades = this.sessionData.getCiudades();
    //this.cities.forEach((valor: any) => {    });    
    console.log('this.ciudades', this.ciudades);
    this.showSplash = false;
  }

  getCategories() {
    this.categories = this.sessionData.getCategorias();
    //this.categories.forEach((valor: any) => {    });
    console.log('this.categories', this.categories);
    this.showSplash = false;
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

}
