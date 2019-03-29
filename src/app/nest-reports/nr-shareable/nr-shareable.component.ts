import { Component, OnInit } from '@angular/core';
import { Migration } from 'src/app/migrations/model/migration';
import { NestReport } from '../models/nest-report';
import { NestReportsService } from '../nest-reports.service';
import { MigrationsService } from 'src/app/migrations/migrations.service';
import * as moment from 'moment';

@Component({
  selector: 'app-nr-shareable',
  templateUrl: './nr-shareable.component.html',
  styleUrls: ['./nr-shareable.component.scss']
})
export class NrShareableComponent implements OnInit {
  migration: Migration;
  nestReports: NestReport[];
  showAttribution: boolean;
  alphaOrder: boolean;
  dateOrder: boolean;

  constructor(private migrationsService: MigrationsService,
    private nestReportsService: NestReportsService) { }

  async getNestReportInfo() {
    this.migrationsService.getMigrationsList().subscribe(migrations => {
      this.migration = migrations && migrations.filter(migration => moment(migration.endDate) >= moment())[0] || migrations[migrations.length - 1];
    });

    let reports = await this.nestReportsService.getNestReportsList();

    this.nestReports = reports && reports.filter((report: NestReport) => this.migration && report.migration.id === this.migration.id);
  }

  orderBy(order: string, direction: boolean) {
    if (order === 'abc') {
      this.nestReports.sort((a, b) => {
        if (a.species.name < b.species.name) {
          return direction && -1 || 1;
        } else if (a.species.name > b.species.name) {
          return direction && 1 || -1;
        } else {
          return 0;
        }
      });
    } else if(order === 'date') {
      this.nestReports.sort((a, b) => {
        if (a.id < b.id) {
          return direction && -1 || 1;
        } else if (a.id > b.id) {
          return direction && 1 || -1;
        } else {
          return 0;
        }
      });
    }
  }

  ngOnInit() {
    this.getNestReportInfo();
  }

  getReportPathImage(report: NestReport) {
    const baseUrl = '/assets/images/decrypted_test/';
    let composedPath = baseUrl;

    if (!report) {
      return '';
    }

    if (report.species.id < 10) {
      composedPath += 'pokemon_icon_00' + report.species.id + '_00.png';
    } else if (report.species.id < 100) {
      composedPath += 'pokemon_icon_0' + report.species.id + '_00.png';
    } else {
      composedPath += 'pokemon_icon_' + report.species.id + '_00.png';
    }

    return composedPath;
  }

  goToSRUY() {
    window.open('http://bit.do/sruy', '_blank');
    return false;
  }

}