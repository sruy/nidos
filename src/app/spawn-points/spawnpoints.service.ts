import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpawnPoint } from './models/spawn-point';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class SpawnPointsService {
  static cachedSpawnPoints: SpawnPoint[];

  constructor(private http: HttpClient, private store: StoreService) { }

  getSpawnPointList() {
    return this.http.get('/assets/spawnpoints.json')
      .toPromise()
      .then(result => <SpawnPoint[]>result)
      .then(data => {
        if (!this.store.read('spawnPoints')) {
          this.store.save('spawnPoints', data);
        }

        if (data !== this.store.read('spawnPoints')) {
          const storeData = this.store.read('spawnPoints');

          return storeData;
        }

        return data;
      });
  }

  newSpawnPoint(point: SpawnPoint) {
    return this.http.post('https://jsonplaceholder.typicode.com/todos/', point)
      .toPromise()
      .catch(err => console.log(err))
      .then(() => {
        this.store.save('spawnPoints', point);

        if (SpawnPointsService.cachedSpawnPoints) {
          SpawnPointsService.cachedSpawnPoints.push(point);
        }
      });
  }
}
