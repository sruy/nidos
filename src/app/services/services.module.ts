import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { AllMigrationsResolver } from '../migrations/allMigrations-resolver';
import { RouterModule } from '@angular/router';
import { MigrationsModule } from '../migrations/migrations.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MigrationsModule
  ],
  providers: [
    { provide: StoreService, useClass: StoreService},
    AllMigrationsResolver
  ]
})
export class ServicesModule { }
