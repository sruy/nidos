import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: DesktopComponent },
 { path: 'points', component: SpListComponent },
 // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false}), SpawnPointsModule],
  exports: [RouterModule],
  declarations: [DesktopComponent]
})
export class AppRoutingModule {}

import { AppComponent } from './app.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { DesktopComponent } from './desktop/desktop.component';
import { SpawnPointsModule } from './spawn-points/spawn-points.module';
import { HttpClientModule } from '@angular/common/http';
import { SpListComponent } from './spawn-points/sp-list/sp-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpawnPointsModule,
    MenubarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
