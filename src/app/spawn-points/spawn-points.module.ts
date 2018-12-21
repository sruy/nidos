import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpListComponent } from './sp-list/sp-list.component';
import { SpCrudComponent } from './sp-crud/sp-crud.component';
import { DataTableModule } from 'primeng/datatable';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SpListComponent, SpCrudComponent],
  imports: [
    CommonModule,
    DataTableModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: SpListComponent}
    ])
  ],
  exports: [SpListComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpawnPointsModule { }
