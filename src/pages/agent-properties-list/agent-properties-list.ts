import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioProvider } from '../../providers/servicio/servicio';
import { PropertyPage } from '../property/property';

/**
 * Generated class for the AgentPropertiesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agent-properties-list',
  templateUrl: 'agent-properties-list.html',
})
export class AgentPropertiesListPage {
  showSplash: boolean;
  properties: any;
  property: any;
  agent_name: "";
  agent_id: number; 

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public proveedor: ServicioProvider) {
      this.property = navParams.data.property;
      this.agent_id = this.property.agent_id;
      this.agent_name = this.property.agent_name;
    console.log('this.agent_id', this.agent_id);
    console.log('this.agent_name', this.agent_name);
  }

  ionViewDidLoad() {    
    this.getProperties();
  }

  getProperties() {
    this.proveedor.getAgentProperties(this.agent_id)
      .subscribe(
        (data) => {
          console.log('data', data);
          this.properties = data;

          this.properties.forEach(element => {
            element.bath_room = parseInt(element.bath_room);
          });

          this.properties = data;
          this.showSplash = false;
        },
        (error) => {
          console.log('error', error);
          this.showSplash = false;
        }
      )
  }

  navToPropertyPage(event, property){
    this.navCtrl.push(PropertyPage, {
      property: property
    });
  }
  
}
