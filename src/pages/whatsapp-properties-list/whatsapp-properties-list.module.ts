import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatsappPropertiesListPage } from './whatsapp-properties-list';

@NgModule({
  declarations: [
    WhatsappPropertiesListPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatsappPropertiesListPage),
  ],
})
export class WhatsappPropertiesListPageModule {}
