import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { Migration } from './model/migration';
import { MessageService } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MigrationsService {
  static id = 100;
  staticAssets = this.http.get('/assets/migrations.json');
  backendList: Observable<any>;
  backendSingle: Observable<any>;
  backendCreate: string;
  backendModify: Observable<any>;
  
  constructor(private http: HttpClient, private store: StoreService, private apollo: Apollo) { 
    this.backendList = this.apollo.subscribe({
      query: gql`
query {
  getAllMigrations {
    id
    visibleName
    startDate
    endDate
    comments
  }
}`});

    this.backendCreate = gql`
mutation createMigration($data: MigrationInput) {
  createMigration(data: $data) {
    id
    visibleName
  }
}`;
  }
  
  getMigrationsList() {
    return this.backendList
      .toPromise()
      .catch(err => {
        if (err.status === 0) {
          throw('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
          console.error(err);
        }
      })
      .then(data => {
        console.log(data)
        return data && (<any>data).data && <Migration[]>(<any>(<any>data).data.getAllMigrations);
      });
  }

  getMigration(migrationId: string) {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/' + migrationId)
      .toPromise()
      .then(returnValue => {
        const migration = this.store.read('migrations', { itemId: migrationId, propertyId: 'id' });

        if (!!migration) {
          return migration;
        }

        return false;
      });
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
      .toPromise()
      .catch(err => {
        console.log(err);

        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }
      })
      .then((resultData) => {
        console.log(resultData);
        /*if (MigrationsService.id) {
          migration.id = '' + (++MigrationsService.id);
        }*/

        //this.store.save('migrations', migration);

        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Migración "${migration.visibleName}" agregada!` });
        }
      });
  }

  editMigration(migrationId: string, values: any, messageService: MessageService) {
    return this.http.put('https://jsonplaceholder.typicode.com/todos/' + migrationId, values)
      .toPromise()
      .then(() => {
        const migrations = this.store.read('migrations');
        let found = -1;

        migrations.forEach((point: Migration, index: number) => {
          if (point.id === migrationId) {
            found = index;
          }
        });

        if (found > -1) {
          if (migrations[found]) {
            values.pointId = migrationId;
            migrations[found] = values;
          }

          this.store.save('migrations', migrations);

          if (!!messageService) {
            messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Migración "${values.visibleName}" editada!` });
          }
        }
      });
  }
}
