import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MgListComponent } from './mg-list/mg-list.component';
import { MgCrudComponent } from './mg-crud/mg-crud.component';
import { ServicesModule } from '../services/services.module';
import { UILibsModule } from '../uilibs/uilibs.module';
import { MigrationsService } from './migrations.service';

@NgModule({
  declarations: [MgListComponent, MgCrudComponent],
  imports: [
    UILibsModule
  ],
  providers: [
    { provide: MigrationsService, useClass: MigrationsService}
  ],
  exports: [MgListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MigrationsModule { }
