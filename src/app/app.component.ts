import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nest-tailors-den';

  menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Reportes',
        items: [
          {
            label: 'Agregar Nuevo',
            icon: 'pi pw pi-plus'
          },
          {
            label: 'Lista Por Migración'
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
