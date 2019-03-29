import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
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
  staticAssets = this.http.get('/assets/migrations.json');
  backendList: Observable<any>;
  backendSingle: string;
  backendCreate: string;
  backendModify: string;

  constructor(private http: HttpClient, private store: StoreService, private apollo: Apollo) {
    this.backendList = this.apollo.watchQuery({
      query: gql`
query {
  getAllMigrations {
    id
    visibleName
    startDate
    endDate
    comments
  }
}`}).valueChanges;

    this.backendCreate = gql`
mutation createMigration($data: MigrationInput) {
  createMigration(data: $data) {
    id
    visibleName
  }
}`;

    this.backendSingle = gql`
  query getMigration($id: Int) {
    getMigration(id: $id) {
      id
      visibleName
      startDate
      endDate
      comments
    }
  }`;

    this.backendModify = gql`
  mutation modifyMigration($id: Int, $data: MigrationInput) {
    modifyMigration(id: $id, data: $data) {
      id
    }
  }`;

  }

  getMigrationsList() {
    return this.backendList
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
    return this.apollo.watchQuery({
      query: this.backendSingle,
      variables: {
        id: migrationId
      }
    }).valueChanges
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
    delete input.id;

    return this.apollo.mutate({
      mutation: this.backendCreate,
      variables: {
        data: input
      }
    })
      .pipe(catchError((err, inp) => {
        console.log(err);

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
}
