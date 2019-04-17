import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nest-tailors-den';

  menuItems: MenuItem[];

  constructor(gtag: Gtag) {}
  
  ngOnInit() {
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
