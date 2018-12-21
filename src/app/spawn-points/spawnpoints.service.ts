import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpawnPoint } from './models/spawn-point';

@Injectable({
  providedIn: 'root'
})
export class SpawnPointsService {

  constructor(private http: HttpClient) { }

  getSpawnPointList() {
    return this.http.get('/assets/spawnpoints.json')
      .toPromise()
      .then(result => <SpawnPoint[]>result)
      .then(data => data);
  }
}
