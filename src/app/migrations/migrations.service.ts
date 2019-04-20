import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Migration } from './model/migration';
import { MessageService } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import * as moment from 'moment';
import { map, catchError } from 'rxjs/operators';
import { flatten } from '@angular/router/src/utils/collection';
@Injectable({
  providedIn: 'root'
})
export class MigrationsService {
  backendList: Observable<any>;
  backendSingle: string;
  backendCreate: string;
  backendModify: string;
  backendRemove: string;

  constructor(private http: HttpClient, private apollo: Apollo) {
    this.backendList = gql`
query {
  getAllMigrations(where: {statusId: [1,3,4,5]}) {
    migrationId
    visibleName
    startDate
    endDate
    comments
    status {
      id
      name
    }
  }
}`;

    this.backendCreate = gql`
mutation createMigration($data: MigrationInput) {
  createMigration(data: $data) {
    migrationId
    visibleName
    status {
      name
    }
  }
}`;

    this.backendSingle = gql`
query getMigration($id: Int) {
    getMigration(migrationId: $id) {
      migrationId
      visibleName
      startDate
      endDate
      comments
      status {
        id
        name
      }
    }
  }`;

    this.backendModify = gql`
mutation modifyMigration($id: Int, $data: MigrationInput) {
    modifyMigration(id: $id, data: $data) {
      migrationId
      status {
        name
      }
    }
  }`;

    this.backendRemove = gql`
mutation removeMigration($id: Int) {
  removeMigration(id: $id) {
    migrationId
    visibleName
  }
}`;
  }

  getMigrationsList() {
    return this.apollo.subscribe({
      query: this.backendList
    })
      .pipe(map(result => {
        const flatten = <Migration[]>(<any>(<any>result).data).getAllMigrations;

        return flatten;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  getMigration(migrationId: number) {
    return this.apollo.subscribe({
      query: this.backendSingle,
      variables: {
        migrationId: migrationId
      }
    })
      .pipe(map(result => {
        const flatten = (<any>(<any>result).data).getMigration;

        if (typeof (flatten.startDate) === 'string') {
          flatten.startDate = moment(Number.parseInt(flatten.startDate));
          flatten.endDate = moment(Number.parseInt(flatten.endDate));
        }

        return <Migration>flatten;
      }));
  }

  newMigration(migration: Migration, messageService?: MessageService) {
    const input: any = migration;
    const statusId = 1;
    delete input.migrationId;
    delete input.status;
    input.statusId = statusId;

    return this.apollo.mutate({
      mutation: this.backendCreate,
      variables: {
        data: input
      }
    })
      .pipe(catchError((err, inp) => {
        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }

        return inp;
      }))
      .pipe(map((resultData) => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Migración "${migration.visibleName}" agregada!` });
        }
      }));
  }

  editMigration(migrationId: string, values: any, messageService: MessageService) {
    const input = values;
    delete input.migrationId;
    delete input.id;

    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        id: migrationId,
        data: input
      }
    }).pipe(map(result => {
      if (!!messageService) {
        messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Migración "${values.visibleName}" editada!` });
      }
    }));
  }

  deleteMigration(id: string, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendRemove,
      variables: {
        id: id
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Migración eliminada', detail: `Migración "${name}" eliminada!` });
        }
      }));
  }

  disableMigration(id: number, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        id: id,
        data: {
          statusId: 2
        }
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Migración eliminada', detail: `Migración "${name}" eliminada!` });
        }
      }));
  }
}
