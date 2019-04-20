import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { AllMigrationsResolver } from '../migrations/allMigrations-resolver';
import { RouterModule } from '@angular/router';
import { MigrationsModule } from '../migrations/migrations.module';
import { NestReportsModule } from '../nest-reports/nest-reports.module';
import { AllNestingSpeciesResolver } from '../nest-reports/allNestingSpecies-resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MigrationsModule
  ],
  providers: [
    AllMigrationsResolver,
    AllNestingSpeciesResolver
  ]
})
export class ServicesModule { }
