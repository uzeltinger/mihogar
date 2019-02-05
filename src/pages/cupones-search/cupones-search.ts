import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { OfferServiceProvider } from '../../providers/offer-service/offer-service';

@Component({
  selector: 'page-cupones-search',
  templateUrl: 'cupones-search.html',
})
export class CuponesSearchPage {
  categories: any;
  categoryFiltered: number;
  showSplash = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public offerService: OfferServiceProvider) {
  }

  ionViewDidLoad() {
    this.categoryFiltered = this.offerService.getCategoryFiltered();
    this.getCategories();
  }

  getCategories() {
    this.offerService.obtenerCategoriasDeOfertas()
      .subscribe(
        (data) => {
          this.categories = data;
          console.log('this.categories',this.categories);
          this.categories.forEach((valor: any) => {
            if (this.categoryFiltered == valor.id) {
              valor.isAssigned = true;
            } else {
              valor.isAssigned = false;
            }

          });
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
        }
      )
  }
  selectedCategory(category) {
    this.categories.forEach((valor: any) => {
      if (valor.id != category.id) {
        valor.isAssigned = false;
      }
    });
    category.isAssigned = true;
    this.offerService.setCategoryFiltered(category.id);
    this.dismiss();
  }

  dismiss() {
    let data = { 'cuponCategoryFiltered': this.categoryFiltered };
    this.viewCtrl.dismiss(data);
  }
}
