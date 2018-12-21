import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpawnPoint } from './models/spawn-point';

@Injectable({
  providedIn: 'root'
})
export class SpawnPointsService {
  static cachedSpawnPoints: SpawnPoint[];

  constructor(private http: HttpClient) { }

  getSpawnPointList() {
    return this.http.get('/assets/spawnpoints.json')
      .toPromise()
      .then(result => <SpawnPoint[]>result)
      .then(data => data);
  }

  newSpawnPoint(point: SpawnPoint) {
    return this.http.post('https://jsonplaceholder.typicode.com/todos/', point)
      .toPromise()
      .catch(err => console.log(err))
      .then(() => {
        if (SpawnPointsService.cachedSpawnPoints) {
          SpawnPointsService.cachedSpawnPoints.push(point);
        }
      });
  }
}
