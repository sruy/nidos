import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { DesktopComponent } from './desktop/desktop.component';
import { SpawnPointsModule } from './spawn-points/spawn-points.module';
import { HttpClientModule } from '@angular/common/http';
import { SpListComponent } from './spawn-points/sp-list/sp-list.component';
import { SpCrudComponent } from './spawn-points/sp-crud/sp-crud.component';
import { ServicesModule } from './services/services.module';
import { MessageService } from 'primeng/api';
import { MigrationsModule } from './migrations/migrations.module';
import { MgListComponent } from './migrations/mg-list/mg-list.component';
import { MgCrudComponent } from './migrations/mg-crud/mg-crud.component';
import { NrCrudComponent } from './nest-reports/nr-crud/nr-crud.component';
import { NrListComponent } from './nest-reports/nr-list/nr-list.component';
import { NestReportsModule } from './nest-reports/nest-reports.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NoCrudComponent } from './notifications/no-crud/no-crud.component';
import { NrShareableComponent } from './nest-reports/nr-shareable/nr-shareable.component';
import { GraphQLModule } from './graphql.module';
import { GtagModule } from 'angular-gtag';
import { AllMigrationsResolver } from './migrations/allMigrations-resolver';
import { AllNestingSpeciesResolver } from './nest-reports/allNestingSpecies-resolver';
import { AllNestReportsResolver } from './nest-reports/allNestReports-resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: DesktopComponent },
  { path: 'points', component: SpListComponent },
  { path: 'new-point', component: SpCrudComponent },
  { path: 'edit-point/:pointId', component: SpCrudComponent },
  { path: 'migrations', component: MgListComponent, resolve: {
    migrations: AllMigrationsResolver
  } },
  { path: 'new-migration', component: MgCrudComponent },
  { path: 'edit-migration/:id', component: MgCrudComponent },
  { path: 'reports', component: NrListComponent, resolve: {
    nestReports: AllNestReportsResolver,
    migrations: AllMigrationsResolver
  } },
  { path: 'new-report', component: NrCrudComponent, resolve: {
    migrations: AllMigrationsResolver,
    nestingSpecies: AllNestingSpeciesResolver
  } },
  { path: 'edit-report/:id', component: NrCrudComponent },
  { path: 'new-notification', component: NoCrudComponent },
  { path: 'edit-notification/:id', component: NoCrudComponent },
  { path: 'infographic', component: NrShareableComponent, resolve: {
    migration: AllMigrationsResolver,
    nestReports: AllNestReportsResolver
  } },
  { path: 'infographic/:id', component: NrShareableComponent }
  // { path: '**', redirectTo: 'home', pathMatch: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false }), SpawnPointsModule, MigrationsModule, NestReportsModule, NotificationsModule, GraphQLModule, HttpClientModule],
  exports: [RouterModule],
  declarations: [DesktopComponent]
})
export class AppRoutingModule { }

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    NoopAnimationsModule,
    ServicesModule,
    GtagModule.forRoot({ trackingId: 'UA-138490555-1', trackPageviews: true})
  ],
  providers: [{
    provide: MessageService, useClass: MessageService
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
