import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { AllMigrationsResolver } from '../migrations/allMigrations-resolver';
import { RouterModule } from '@angular/router';
import { MigrationsModule } from '../migrations/migrations.module';
import { NestReportsModule } from '../nest-reports/nest-reports.module';
import { AllNestingSpeciesResolver } from '../nest-reports/allNestingSpecies-resolver';
import { AllNestReportsResolver } from '../nest-reports/allNestReports-resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MigrationsModule,
    NestReportsModule,
    RouterModule
  ],
  providers: [
    AllMigrationsResolver,
    AllNestingSpeciesResolver,
    AllNestReportsResolver
  ]
})
export class ServicesModule { }
