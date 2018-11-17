import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyPage } from './property';

@NgModule({
  declarations: [
    PropertyPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyPage),
  ],
})
export class PropertyPageModule {}
