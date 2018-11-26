import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCompanyPage } from './my-company';

@NgModule({
  declarations: [
    MyCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCompanyPage),
  ],
})
export class MyCompanyPageModule {}
