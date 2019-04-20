import { Component, OnInit, Input } from '@angular/core';
import { NestReport } from '../models/nest-report';
import { NestReportsService } from '../nest-reports.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  totalRecords: number;

  constructor(private nestReportsService: NestReportsService, private router: Router,
    private migrationsService: MigrationsService, private messageService: MessageService,
    private route: ActivatedRoute) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos reportes de nidos' ||
      ('Reportes de nidos' + (this.migration && ` ${this.migration.visibleName}` || ''));
  }

  ngOnInit() {
    const reports = this.route.snapshot.data['nestReports'];
    const migrationList = this.route.snapshot.data['migrations'];

    if (reports) {
      this.initList(reports);
    } else {
      this.nestReportsService.getNestReportsList().subscribe(reports => {
        this.initList(reports);
      });
    }

    if (migrationList) {
      this.registeredMigrations = migrationList;
    } else {
      this.migrationsService.getMigrationsList().subscribe((migrationList) => {
        this.registeredMigrations = migrationList;
      });
    }
  }

  initList(reports: NestReport[]) {
    this.list = reports;

    this.totalRecords = reports.length;

    if (this.list && this.list.length && this.list.length > 0) {
      this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
    }
  }

  paginateReports(event) {
    if (this.list) {
      this.paginatedList = this.list.slice(event.first, (!!event.first && event.first + event.rows) || event.rows);
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
        return ("" + migration.migrationId).lastIndexOf(event.query) !== -1 || migration.visibleName.lastIndexOf(event.query) !== -1;
      }) || [];
    });
  }

  filterReportsByMigration(event) {
    this.migration = event;
    this.nestReportsService.getNestReportsList().subscribe((list) => {
      this.paginatedList = list.filter((report: NestReport) => {
        return report.migration.migrationId === event.migrationId;
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
        });
      });
    }
  }

  isConfirmed(report: NestReport) {
    return report.status.id === 1 || report.status.id === 3;
  }

  isRejected(report: NestReport) {
    return report.status.id === 2 || report.status.id === 5;
  }

  confirmReport(report: NestReport) {
    this.nestReportsService.confirmReport(report.reportId, report.species.name, this.messageService).subscribe(result => {
      this.nestReportsService.getNestReportsList().subscribe(points => {
        this.list = points;
        this.resetReportList();
      });
    });
  }

  rejectReport(report: NestReport) {
    this.nestReportsService.rejectReport(report.reportId, report.species.name, this.messageService).subscribe(result => {
      this.nestReportsService.getNestReportsList().subscribe(points => {
        this.list = points;
        this.resetReportList();
      });
    });
  }
}
