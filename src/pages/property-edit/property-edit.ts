import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Property } from '../../models/property';
import { isNullOrUndefined } from 'util';
import { SessionProvider } from '../../providers/session/session';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { AlertController } from 'ionic-angular';

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
  galleryPhoto: any;
  newPhoto: any;
  base64Image: string;
  pictures_path: string;
  categoryIdsArray: any;
  private win: any = window;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public platform: Platform,
    private alertController: AlertController,
    private camera: Camera,
    private imagePicker: ImagePicker,
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
      let bath_room: string = this.property.bath_room.toString();
      this.property.bath_room = parseInt(bath_room);
      if (this.property.mobile == '') {
        this.property.mobile = "1130190242";
      }
      this.property.link = "http://diportal.com.ar/component/osproperty/" + this.property.ref + "-" + this.property.pro_alias + "-" + this.property.id + ".html"
      this.property.whatsappLink = "http://mihogar.net.ar/propiedad/" + this.property.id + ".html";
      if(!isNullOrUndefined(this.property.price)){
        this.property.price = parseInt(this.property.price.toString());
      }
      this.property.picture_path = this.servicioProvider.urlInmobiliaria + '/images/osproperty/properties/' + this.property.id + '/medium/' + this.property.image;
      this.pictures_path = '';
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
    this.categoryIdsArray = this.property.categoryIds;
    console.log('this.categoryIdsArray', this.categoryIdsArray);
    return this.formBuilder.group({
      id: [this.property.id || 0, Validators.required],
      pro_name: [this.property.pro_name, Validators.required],
      categoryIds: [this.property.categoryIds, Validators.required],
      pro_type: [this.property.pro_type, Validators.required],
      published: [this.property.published],
      bath_room: [this.property.bath_room, Validators.required],
      bed_room: [this.property.bed_room, Validators.required],
      city: [this.property.city, Validators.required],
      curr: [this.property.curr],
      price: [this.property.price],
      image: [this.property.image],
      image_id: [this.property.image_id],
      parking: [this.property.parking],
      pro_small_desc: [this.property.pro_small_desc],
      ref: [this.property.ref],
      rooms: [this.property.rooms, Validators.required],
      address: [this.property.address],
    });
  }

  compareWithCategories(ca1: any, ca2: any): boolean {
    //console.log('ca1',ca1);    console.log('ca2',ca2);
    return ca1 && ca2 ? ca1.id === ca2.id : false;
  }
  saveData() {
    this.showSplash = true;
    console.log('this.myForm.value', this.myForm.value);
    let dataSend = this.myForm.value;
    if (this.base64Image != '') {
      dataSend.base64Image = this.base64Image;
      dataSend.image = '';
    }

    if(isNullOrUndefined(this.base64Image) && this.property.picture_path == ''){
      this.showToast('Por favor agregue una imagen.');
      this.showSplash = false;
      return false;
    }
    console.log('dataSend: ', dataSend);
    this.servicioProvider.saveProperty(dataSend)
      .subscribe(
        data => {
          if (data.data['guardado'] == true) {
            this.showToast('Guardada');
          } else {
            this.showToast('Error guardando');
          }
          this.navCtrl.pop();
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
      position: 'bottom'
    });

    toast.present(toast);
  }

  takePicture() {
    if (this.platform.is('core')) {

      let image = 'http://localhost:8100/1.jpg';
      this.galleryPhoto = image;
      var img = document.createElement("img");
      img.src = image;
      this.resize(img, 800, 800, (resized_jpeg) => {
        this.base64Image = resized_jpeg;
        console.log('this.base64Image', this.base64Image);
      });

    } else {

      if (this.platform.is('android')) {
        let options = {
          maximumImagesCount: 1,
          outType: 0,
          title: 'titulo',
          message: 'mensaje',
          quality: 100
        };

        this.imagePicker.getPictures(options).then((results) => {

          console.log('imagePicker results: ' + results);

          /*for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);
            this.galleryPhoto = results[i];
          }
          this.getBase64String(this.galleryPhoto);*/
        }, (err) => { console.log('getPictures err: ' + err); });
      }
    }
  }


  takeCameraPicture() {
    if (this.platform.is('core')) {

      let image = 'http://localhost:8100/1.jpg';
      this.galleryPhoto = image;
      var img = document.createElement("img");
      img.src = image;
      this.resize(img, 800, 800, (resized_jpeg) => {
        this.base64Image = resized_jpeg;
        console.log('this.base64Image', this.base64Image);
      });

    } else {

      const options: CameraOptions = {
        quality: 50,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI,
        //destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        //mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        allowEdit: true
      }
      this.camera.getPicture(options).then((imageData) => {
        let newUrl = this.win.Ionic.WebView.convertFileSrc(imageData);
        console.log('newUrl 213', newUrl);
        console.log('imageData 214', imageData);
        this.getBase64String(newUrl);        
        this.galleryPhoto = newUrl;
      }, (err) => {
        console.log('err', err);
      });
    }
  }
  
  getBase64String(filePath: string) {
    var img = document.createElement("img");
    img.src = filePath;
    this.resize(img, 800, 800, (resized_jpeg) => {
      this.base64Image = resized_jpeg;
      console.log('this.base64Image', this.base64Image);
    });
  }  

  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    // This will wait until the img is loaded before calling this function
    //https://jinalshahblog.wordpress.com/2017/01/10/how-to-upload-imageangular2/
    return img.onload = () => {
      // Get the images current width and height
      var width = img.width;
      var height = img.height;
      console.log('width: ', img.width);
      console.log('height: ', img.height);
      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      // create a canvas object
      var canvas = document.createElement("canvas");
      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');
      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }

  deleteOldImage() {
    const confirm = this.alertController.create({
      title: 'Eliminar?',
      message: 'Desea eliminar esta imagen de su propiedad?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.property.image = null;
            this.newPhoto = '';
            this.galleryPhoto = '';
            this.property.picture_path = '';
          }
        }
      ]
    });
    confirm.present();
  }

  deletePhoto() {
    const confirm = this.alertController.create({
      title: 'Eliminar?',
      message: 'Desea eliminar esta imagen de su propiedad?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.newPhoto = '';
            this.galleryPhoto = '';
          }
        }
      ]
    });
    confirm.present();
  }

}
