import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { NestReport } from './models/nest-report';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NestReportsService {
  static id = 10;
  constructor(private http: HttpClient, private store: StoreService) { }

  getNestReportsList() {
    return this.http.get('/assets/nestreports.json')
      .toPromise()
      .then(result => <NestReport[]> result)
      .then(data => {
        if (!this.store.read('nestReports')) {
          this.store.save('nestReports', data);
        }

        if (data !== this.store.read('nestReports')) {
          const storeData = this.store.read('nestReports');

          return storeData;
        }

        return data;
      });
  }

  getNestReport(reportId: number) {
    return this.getNestReportsList().then((list: NestReport[]) => {
      let report: NestReport;

      list.forEach((eachReport: NestReport) => {
        if (+(eachReport.reportId) === reportId) {
          report = eachReport;
        }
      });

      return report;
    });
  }

  newReport(report: NestReport, messageService?: MessageService) {
    return this.http.post('https://jsonplaceholder.typicode.com/todos', report)
      .toPromise()
      .catch(err => {
        console.log(err);

        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }
      })
      .then(() => {
        if (NestReportsService.id) {
          report.reportId = (++NestReportsService.id);
        }

        this.store.save('nestReports', report);

        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Reporte de "${report.species.name}" agregado!` });
        }
      });
  }

  editReport(reportId: number, values: any, messageService: MessageService) {
    return this.http.put('https://jsonplaceholder.typicode.com/todos/' + reportId, values)
      .toPromise()
      .then(() => {
        const reports = this.store.read('nestReports');
        let found = -1;

        reports.forEach((report: NestReport, index: number) => {
          if (report.reportId === reportId) {
            found = index;
          }
        });

        if (found > -1) {
          if (reports[found]) {
            values.id = reportId;
            reports[found] = values;
          }

          this.store.save('nestReports', reports);

          if (!!messageService) {
            messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Reporte "${values.species.name}" editado!` });
          }
        }
      });
  }
}
