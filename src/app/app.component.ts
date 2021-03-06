import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Gtag } from 'angular-gtag';
import { UsersService } from './users/users.service';
import { Router } from '@angular/router';
import * as tz from 'moment-timezone';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuItems: MenuItem[];
  releaseDate = tz(moment('2019-04-30 17:00:00'), 'America/Montevideo');
  releaseInterval: any;
  timeRemaining = [];
  shownTimer: string = '';
  maintenanceMode = true;

  constructor(gtag: Gtag, private usersService: UsersService, private router: Router) { }

  get logged() {
    return this.usersService.isLogged();
  }

  hasAuthorizedRole() {
    return this.usersService.hasAuthorizedRole();
  }
  
  ngOnInit() {
    this.usersService.getAuthenticatedUser().subscribe((result) => {
      UsersService.authUser = result;
      this.router.navigate(['/home']);
      this.updateMenuItems();
    });

    if (this.releaseDate && moment().isBefore(this.releaseDate)) {
      
      this.releaseInterval = window.setInterval(() => {
        const duration = moment.duration(moment(this.releaseDate).diff(moment()));
        this.shownTimer = '';
        if (moment(tz(moment(), 'America/Montevideo')).isSameOrAfter(this.releaseDate)) {
          window.clearInterval(this.releaseInterval);
          this.releaseDate = null;
        } else {
          this.shownTimer = ''+duration.asMilliseconds();
        }
      }, 1000);
    } else {
      this.releaseDate = null;
    }

    this.menuItems = [
      {
        label: 'Reportes',
        items: [
          {
            label: 'Lista Por Migración',
            routerLink: 'reports'
          },
          {
            label: 'En curso',
            routerLink: 'infographic'
          }
        ]
      }      
    ]; 
  }

  updateMenuItems() {
    if (this.hasAuthorizedRole()) {
      const reports = [{
        label: 'Agregar Nuevo',
        icon: 'pi pw pi-plus',
        routerLink: 'new-report'
      }, ...this.menuItems[0].items];

      this.menuItems[0].items = <any>reports;
      
      this.menuItems.push(...[
        {
          label: 'Configurar',
          items: [{
            label: 'Punto',
            items: [
              {
                label: 'Nuevo',
                icon: 'pi pw pi-plus',
                routerLink: 'new-point'
              },
              {
                label: 'Lista',
                routerLink: 'points'
              }
            ]
          },
          {
            label: 'Migración',
            items: [
              {
                label: 'Nueva',
                icon: 'pi pw pi-plus',
                routerLink: 'new-migration'
              },
              {
                label: 'Lista',
                routerLink: 'migrations'
              }
            ]
          },
          {
            label: 'Notificación',
            items: [
              {
                label: 'Nueva',
                icon: 'pi pi-plus',
                routerLink: 'new-notification'
              },
              /*{
                label: 'Lista',
                icon: 'pi pi-list',
                routerLink: 'notifications'
              }*/
            ]
          }]
        },
        {
          label: 'Estadísticas',
          items: [
            {
              label: 'Ver Históricos'
            }
          ]
        }
      ]);
    }
  }
}
