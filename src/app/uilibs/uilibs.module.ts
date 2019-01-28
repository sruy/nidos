import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    TableModule,
    InputTextModule,
    PanelModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextareaModule
  ]
})
export class UILibsModule { }
