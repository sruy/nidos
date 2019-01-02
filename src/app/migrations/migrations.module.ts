import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgListComponent } from './mg-list/mg-list.component';
import { MgCrudComponent } from './mg-crud/mg-crud.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [MgListComponent, MgCrudComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    ToastModule
  ],
  exports: [MgListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MigrationsModule { }
