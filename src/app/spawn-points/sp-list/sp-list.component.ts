import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SpawnPoint } from '../models/spawn-point';
import { SpawnPointsService } from '../spawnpoints.service';

@Component({
  selector: 'app-sp-list',
  templateUrl: './sp-list.component.html',
  styleUrls: ['./sp-list.component.scss']
})
export class SpListComponent implements OnInit {
  @Input() mode: string;
  list: SpawnPoint[] = [];
  paginatedList: SpawnPoint[] = [];

  constructor(private spawnPointsService: SpawnPointsService) {
  }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos puntos agregados' || 'Puntos';
  }

  ngOnInit() {
    this.spawnPointsService.getSpawnPointList().then(points => {
      this.list = points;
      
      if (this.list && this.list.length && this.list.length > 0) {
        this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
      }
    });
  }

  paginatePoints(event) {
    this.paginatedList = this.list.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
  }

}
