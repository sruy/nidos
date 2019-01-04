import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { Migration } from './model/migration';

@Injectable({
  providedIn: 'root'
})
export class MigrationsService {

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
        const migration = this.store.read('migrations', {itemId: migrationId, propertyId: 'id'});

        if (!!migration) {
          return migration;
        }

        return false;
      });
    }
}
