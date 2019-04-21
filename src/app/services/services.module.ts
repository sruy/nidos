import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from './store.service';
import { AllMigrationsResolver } from '../migrations/allMigrations-resolver';
import { RouterModule } from '@angular/router';
import { MigrationsModule } from '../migrations/migrations.module';
import { NestReportsModule } from '../nest-reports/nest-reports.module';
import { AllNestingSpeciesResolver } from '../nest-reports/allNestingSpecies-resolver';
import { AllNestReportsResolver } from '../nest-reports/allNestReports-resolver';
import { AllSpawnPointsResolver } from '../spawn-points/allSpawnPoints-resolver';
import { SpawnPointsModule } from '../spawn-points/spawn-points.module';
import { EnabledNestReportsResolver } from '../nest-reports/enabledNestReports-resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MigrationsModule,
    NestReportsModule,
    SpawnPointsModule,
    RouterModule
  ],
  providers: [
    AllMigrationsResolver,
    AllNestingSpeciesResolver,
    AllNestReportsResolver,
    AllSpawnPointsResolver,
    EnabledNestReportsResolver
  ]
})
export class ServicesModule { }
