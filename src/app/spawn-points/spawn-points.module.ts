import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpListComponent } from './sp-list/sp-list.component';
import { SpCrudComponent } from './sp-crud/sp-crud.component';

@NgModule({
  declarations: [SpListComponent, SpCrudComponent],
  imports: [
    CommonModule
  ]
})
export class SpawnPointsModule { }
