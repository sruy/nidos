import { Component, OnInit, Input } from '@angular/core';
import { NestReport } from '../models/nest-report';
import { NestReportsService } from '../nest-reports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nr-list',
  templateUrl: './nr-list.component.html',
  styleUrls: ['./nr-list.component.scss']
})
export class NrListComponent implements OnInit {
  @Input() mode: string;
  list: NestReport[];
  paginatedList: NestReport[];

  constructor(private nestReportsService: NestReportsService, private router: Router) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimos reportes de nidos' || 'Reportes de nidos';
  }

  ngOnInit() {
    this.nestReportsService.getNestReportsList().then(reports => {
      this.list = reports;

      if (this.list && this.list.length && this.list.length > 0) {
        this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
      }
    });
  }

  paginateReports(event) {
    if (this.list) {
      this.paginatedList = this.list.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
    }
  }

  editReport(report: NestReport) {
    if (!!report && report.migration && report.migration.id) {
      this.router.navigate(['/edit-report', report.id]);
    }
  }
}
