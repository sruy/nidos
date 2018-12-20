import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpawnPoint } from '../models/spawn-point';

@Component({
  selector: 'app-sp-list',
  templateUrl: './sp-list.component.html',
  styleUrls: ['./sp-list.component.css']
})
export class SpListComponent implements OnInit {
  @Input() mode: string;
  list: SpawnPoint[];
  paginatedList: SpawnPoint[];

  constructor(private http: HttpClient) {
  }

  getSpawnPointList() {
    return this.http.get('/test-data/spawnpoints.json')
            .toPromise()
            .then(result => <SpawnPoint[]>result)
            .then(data => data);
  }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos puntos agregados' || 'Puntos';
  }

  ngOnInit() {
    this.list = [];

/*
      new SpawnPoint(),
      new SpawnPoint(),
      new SpawnPoint()
    ];
*/
/*
    this.list[0].name = 'Plaza Republica del Libano';
    this.list[1].name = 'Parque Rodó (Gym Escultura Abstracta)';
    this.list[2].name = 'Camino Castro y Carlos Brussa';
*/
    this.getSpawnPointList().then(points => {
      console.log(points);
      this.list = points;
      this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
    });
  }

  paginatePoints(event) {
    this.paginatedList = this.list.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
  }

}
