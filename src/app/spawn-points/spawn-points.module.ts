import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SpListComponent } from './sp-list/sp-list.component';
import { SpCrudComponent } from './sp-crud/sp-crud.component';
import { ServicesModule } from '../services/services.module';
import { UILibsModule } from '../uilibs/uilibs.module';

@NgModule({
  declarations: [SpListComponent, SpCrudComponent],
  imports: [
    UILibsModule,
    ServicesModule
  ],
  exports: [SpListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpawnPointsModule { }
