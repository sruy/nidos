import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { SpawnPoint } from '../models/spawn-point';
import { SpawnPointsService } from '../spawnpoints.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { sortDesc, sortAsc } from 'src/app/utils/utils';
import { City } from 'src/app/nest-reports/models/city';
import { CitiesService } from 'src/app/nest-reports/cities.service';

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
  selectedCity: City;
  cities: City[];
  registeredCities: City[];

  constructor(private spawnPointsService: SpawnPointsService, private router: Router,
    private messageService: MessageService, private route: ActivatedRoute, 
    private citiesService: CitiesService) {
  }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos puntos agregados' || 'Puntos';
  }

  getLinkAnchor(point: SpawnPoint) {
    let link = `<a href="${point.link}" target="_new">${point.thirdPartyService || 'TSR'}${!!point.thirdPartyNestId && ` (#${point.thirdPartyNestId})` || ''}</a>`;
    return link;
  }

  ngOnInit() {
    const points = this.route.snapshot.data['points'];
    const cities = this.route.snapshot.data['cities'];

    if (points) {
      this.initList(points);
    } else {
      this.spawnPointsService.getSpawnPointList().subscribe(points => {
        this.initList(points);
      });
    }

    if (cities) {
      this.registeredCities = cities.sort(sortAsc('name'));
      this.cities = cities;
    } else {
      this.citiesService.getAllCities().subscribe(cities => {
        this.cities = cities;
        this.registeredCities = cities.sort(sortAsc('name'));
      });
    }
  }

  initList(points: SpawnPoint[]) {
    if (this.mode === 'compact') {
      this.list = points.sort(sortDesc('pointId'));
    } else {
      this.list = points.sort(sortAsc('name'));
    }

    this.totalRecords = points.length;

    if (this.list && this.list.length && this.list.length > 0) {
      this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
    }
  }

  paginatePoints(event) {
    this.paginatedList = this.list.slice(event.first, (!!event.first && event.first + event.rows) || event.rows);
  }

  editPoint(point: SpawnPoint) {
    if (!!point && point.pointId) {
      this.router.navigate(['/edit-point', point.pointId]);
    }
  }

  deletePoint(point: SpawnPoint) {
    if (!!point && point.pointId) {
      this.spawnPointsService.disableSpawnPoint(Number.parseInt(point.pointId), point.name, this.messageService).subscribe(result => {
        this.spawnPointsService.getSpawnPointList().subscribe(points => {
          this.list = points;
          this.paginatedList = points.slice(0, this.mode !== 'compact' && 10 || 5);
        })
      });
    }
  }

  filterCity(event) {
    this.registeredCities = this.cities.filter((city) => {
      return city.name.toLowerCase().lastIndexOf(event.query.toLowerCase()) !== -1;
    }) || this.cities;
  }

  filterPointsByCity(event) {
    this.selectedCity = event;
    this.paginatedList = this.list.filter((point: SpawnPoint) => {
      return point.city.id === event.id;
    });
    this.totalRecords = this.paginatedList.length;
  }

  resetPointList() {
    this.selectedCity = null;
    this.paginatedList = this.list;
  }
}
