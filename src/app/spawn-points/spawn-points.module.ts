import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpListComponent } from './sp-list/sp-list.component';
import { SpCrudComponent } from './sp-crud/sp-crud.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [SpListComponent, SpCrudComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  exports: [SpListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpawnPointsModule { }
