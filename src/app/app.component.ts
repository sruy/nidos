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
  logged: boolean;
  menuItems: MenuItem[];
  releaseDate = tz(moment('2019-04-30 17:00:00'), 'America/Montevideo');
  releaseInterval: any;
  timeRemaining = [];
  shownTimer: string = '';

  constructor(gtag: Gtag, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getAuthenticatedUser().subscribe((result) => {
      UsersService.authUser = result;
      this.router.navigate(['/home']);
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
    }

    this.menuItems = [
      {
        label: 'Reportes',
        items: [
          {
            label: 'Agregar Nuevo',
            icon: 'pi pw pi-plus',
            routerLink: 'new-report'
          },
          {
            label: 'Lista Por Migración',
            routerLink: 'reports'
          },
          {
            label: 'En curso',
            routerLink: 'infographic'
          }
        ]
      },
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
    ];
  }
}
