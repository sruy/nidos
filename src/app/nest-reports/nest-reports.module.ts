import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NrListComponent } from './nr-list/nr-list.component';
import { NrCrudComponent } from './nr-crud/nr-crud.component';
import { UILibsModule } from '../uilibs/uilibs.module';
import { ServicesModule } from '../services/services.module';
import { NrShareableComponent } from './nr-shareable/nr-shareable.component';
import { NestingSpeciesService } from './nesting-species.service';
import { NestReportsService } from './nest-reports.service';
import { MigrationsService } from '../migrations/migrations.service';
import { NrSpeciesAdminComponent } from './nr-species-admin/nr-species-admin.component';

@NgModule({
  declarations: [NrListComponent, NrCrudComponent, NrShareableComponent, NrSpeciesAdminComponent],
  imports: [
    UILibsModule,
  ],
  exports: [NrListComponent, NrShareableComponent],
  providers: [
    { provide: NestReportsService, useClass: NestReportsService}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NestReportsModule { }
