import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { NestReport } from './models/nest-report';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NestReportsService {
  staticAssets = this.http.get('/assets/nestreports.json');
  backendList: Observable<any>;
  backendSingle: string;
  backendCreate: string;
  backendModify: string;
  backendRemove: string;

  static id = 10;
  constructor(private http: HttpClient, private store: StoreService, private apollo: Apollo) {
    this.backendList = /*this.apollo.subscribe({
      query: */gql`
query allNestReports($statusId: [Int]) {
  allNestReports(where: {statusId: $statusId}) {
    reportId,
    migration {
      migrationId
      visibleName
    }
    spawnPoint {
      pointId
      name
      link
    }
    species {
      id
      name
    }
    status {
      id
      name
    }
    spottedBy
    confirmedBy {
      userName
    }
    broadcastStatus
  }
}`/*})*/;

    this.backendSingle = gql`
query getNestReport($reportId: Int) {
  getNestReport(where: { reportId: $reportId}) {
    reportId,
    migration {
      migrationId
      visibleName
    }
    spawnPoint {
      pointId
      name
      link
    }
    species {
      id
      name
    }
    status {
      id
      name
    }
    spottedBy
    confirmedBy {
      userName
    }
    broadcastStatus
  }
}`;

    this.backendCreate = gql`
mutation createReport($data: NestReportInput) {
  createReport(data: $data) {
    reportId
    spottedBy
    species {
      name
    }
    status {
      name
    }
  }
}`;

    this.backendModify = gql`
mutation modifyReport($id: Int, $data: NestReportInput) {
  modifyReport(id: $id, data: $data) {
    reportId
    spottedBy
    species {
      name
    }
    status {
      name
    }
  }
}`;

    this.backendRemove = gql`
mutation removeReport($id: Int) {
  removeReport(id: $id) {
    reportId,
    status {
      id
      name
    }
  }
}`;
  }

  getNestReportsList(options?: {filterDisabled: boolean}) {
    let queryObject: any = {};

    if (!!options && options.filterDisabled) {
      queryObject.query = this.backendList;
      queryObject.variables = {
        statusId: [1,3,4,5]
      };
    } else {
      queryObject.query = this.backendList;
    }
    return this.apollo.subscribe(queryObject)
      .pipe(map(result => {
        const flatten = <NestReport[]>(<any>(<any>result).data).allNestReports;

        return flatten;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  getNestReport(reportId: number) {
    return this.apollo.subscribe({
      query: this.backendSingle,
      variables: {
        reportId: reportId
      }
    })
      .pipe(map(result => {
        const flattened = (<any>(<any>result).data).getNestReport;

        return flattened;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));;
  }

  newReport(report: NestReport, messageService?: MessageService) {
    const input: any = report;
    const speciesName = report.species.name;
    const speciesId = report.species.id;
    const spawnPointId = report.spawnPoint.pointId;
    const migrationId = report.migration.migrationId;
    const statusId = 1;
    const confirmedByUserId = 1; // ToDo: hardcoded
    delete input.species;
    delete input.spawnPoint;
    delete input.migration;
    delete input.status;
    delete input.confirmedBy;
    delete input.reportId;

    input.speciesId = speciesId;
    input.spawnPointId = spawnPointId;
    input.migrationId = migrationId;
    input.statusId = statusId;
    input.confirmedByUserId = confirmedByUserId;

    return this.apollo.mutate({
      mutation: this.backendCreate,
      variables: {
        data: input
      }
    })
      .pipe(catchError((err, inp) => {
        console.error(err);
        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }

        return inp;
      }))
      .pipe(map((resultData) => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Reporte de "${speciesName}" agregado!` });
        }
      }));
  }

  editReport(reportId: number, values: any, messageService: MessageService) {
    const input: any = values;
    const speciesId = values.species.id;
    const speciesName = values.species.name;
    const spawnPointId = values.spawnPoint.pointId;
    const migrationId = values.migration.migrationId;
    const statusId = values.status.id;
    const confirmedByUserId = 1;
    delete values.species;
    delete values.spawnPoint;
    delete values.migration;
    delete values.status;
    delete values.confirmedBy;
    input.speciesId = speciesId;
    input.spawnPointId = spawnPointId;
    input.migrationId = migrationId;
    input.statusId = statusId;
    input.confirmedByUserId = confirmedByUserId;

    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        id: reportId,
        data: input
      }
    }).pipe(map((result) => {
      if (!!messageService) {
        messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Reporte "${speciesName}" editado!` });
      }
    }));
  }

  deleteReport(reportId: string, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendRemove,
      variables: {
        id: reportId
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Reporte eliminado', detail: `Reporte "${name}" eliminado!` });
        }
      }));
  }

  disableReport(reportId: number, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        id: reportId,
        data: {
          statusId: 2
        }
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Reporte eliminado', detail: `Reporte "${name}" eliminado!` });
        }
      }));
  }
}
