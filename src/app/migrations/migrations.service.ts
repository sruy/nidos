import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { Migration } from './model/migration';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MigrationsService {
  static id = 100;
  constructor(private http: HttpClient, private store: StoreService) { }

  getMigrationsList() {
    return this.http.get('/assets/migrations.json')
      .toPromise()
      .then(result => <Migration[]>result)
      .then(data => {
        if (!this.store.read('migrations')) {
          this.store.save('migrations', data);
        }

        if (data !== this.store.read('migrations')) {
          const storeData = this.store.read('migrations');

          return storeData;
        }

        return data;
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
    return this.http.post('https://jsonplaceholder.typicode.com/todos/', migration.id)
      .toPromise()
      .catch(err => {
        console.log(err);

        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }
      })
      .then(() => {
        if (MigrationsService.id) {
          migration.id = '' + (++MigrationsService.id);
        }

        this.store.save('migrations', migration);

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
