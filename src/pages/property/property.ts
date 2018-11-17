import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgentPropertiesListPage } from '../agent-properties-list/agent-properties-list';

/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {
  property: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
      this.property = navParams.data.property;
    console.log('this.property', this.property);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyPage');
  }

  navToAgentPropertiesListPage(event, property){
    this.navCtrl.push(AgentPropertiesListPage, {
      property: property
    });
  }
  
}
