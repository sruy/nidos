import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SpawnPoint } from '../models/spawn-point';
import { SpawnPointsService } from '../spawnpoints.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-sp-list',
  templateUrl: './sp-list.component.html',
  styleUrls: ['./sp-list.component.scss']
})
export class SpListComponent implements OnInit {
  @Input() mode: string;
  list: SpawnPoint[] = [];
  paginatedList: SpawnPoint[] = [];
  totalRecords: number;
  @ViewChild('list') table: Table;

  constructor(private spawnPointsService: SpawnPointsService, private router: Router, private messageService: MessageService) {
  }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos puntos agregados' || 'Puntos';
  }

  getLinkAnchor(point: SpawnPoint) {
    let link = `<a href="${point.link}" target="_new">${point.thirdPartyService || 'TSR'}${!!point.thirdPartyNestId && ` (#${point.thirdPartyNestId})` || ''}</a>`;
    return link;
  }

  ngOnInit() {
    this.spawnPointsService.getSpawnPointList().subscribe(points => {
      this.list = points.sort((first, second) => {
        if (first.name > second.name) {
          return 1;
        } else if (first.name < second.name) {
          return -1
        } else {
          return 0;
        }
      });
      this.totalRecords = points.length;

      if (this.list && this.list.length && this.list.length > 0) {
        this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
      }
    });
  }

  paginatePoints(event) {
    this.paginatedList.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
  }

  editPoint(point: SpawnPoint) {
    if (!!point && point.pointId) {
      this.router.navigate(['/edit-point', point.pointId]);
    }
  }

  deletePoint(point: SpawnPoint) {
    if (!!point && point.pointId) {
      this.spawnPointsService.deleteSpawnPoint(point.pointId, point.name, this.messageService).subscribe(result => {
        this.spawnPointsService.getSpawnPointList().subscribe(points => {
          this.list = points;
          this.paginatedList = points.slice(0, this.mode !== 'compact' && 10 || 5);
        })
      });
    }
  }
}
