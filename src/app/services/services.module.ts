import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: StoreService, useClass: StoreService}
  ]
})
export class ServicesModule { }
