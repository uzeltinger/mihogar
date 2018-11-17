import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentPropertiesListPage } from './agent-properties-list';

@NgModule({
  declarations: [
    AgentPropertiesListPage,
  ],
  imports: [
    IonicPageModule.forChild(AgentPropertiesListPage),
  ],
})
export class AgentPropertiesListPageModule {}
