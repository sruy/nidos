import { Component, OnInit, Input } from '@angular/core';
import { NestReport } from '../models/nest-report';
import { NestReportsService } from '../nest-reports.service';
import { Router } from '@angular/router';
import { Migration } from '../../migrations/model/migration';
import { MigrationsService } from '../../migrations/migrations.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nr-list',
  templateUrl: './nr-list.component.html',
  styleUrls: ['./nr-list.component.scss']
})
export class NrListComponent implements OnInit {
  @Input() mode: string;
  list: NestReport[];
  paginatedList: NestReport[];
  registeredMigrations: Migration[];
  migration: Migration;

  constructor(private nestReportsService: NestReportsService, private router: Router,
    private migrationsService: MigrationsService, private messageService: MessageService) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos reportes de nidos' || 
      ('Reportes de nidos' + (this.migration && ` ${this.migration.visibleName}` || ''));
  }

  ngOnInit() {
    this.nestReportsService.getNestReportsList().subscribe(reports => {
      this.list = reports;

      if (this.list && this.list.length && this.list.length > 0) {
        this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
      }
    });

    this.migrationsService.getMigrationsList().subscribe((migrationList) => {
      this.registeredMigrations = migrationList;
    });
  }

  paginateReports(event) {
    if (this.list) {
      this.paginatedList = this.list.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
    }
  }

  editReport(report: NestReport) {
    if (!!report && report.migration && report.migration.migrationId) {
      this.router.navigate(['/edit-report', report.reportId]);
    }
  }

  filterMigration(event) {
    this.migrationsService.getMigrationsList().subscribe((list) => {
      this.registeredMigrations = list.filter((migration) => {
        return migration.migrationId.lastIndexOf(event.query) !== -1 || migration.visibleName.lastIndexOf(event.query) !== -1;
      }) || [];
    });
  }

  filterReportsByMigration(event) {
    this.migration = event;
    this.nestReportsService.getNestReportsList().subscribe((list) => {
      this.paginatedList = list.filter((report: NestReport) => {
        return report.migration.migrationId === event.id;
      });
    });
  }

  resetReportList() {
    this.migration = null;
    this.paginatedList = this.list.slice(0, 10);
  }

  deleteReport(report: NestReport) {
    if (!!report && report.reportId) {
      this.nestReportsService.disableReport(report.reportId, report.species.name, this.messageService).subscribe(result => {
        this.nestReportsService.getNestReportsList().subscribe(points => {
          this.list = points;
          this.resetReportList();
        })
      });
    }
  }
}
