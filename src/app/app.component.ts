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
