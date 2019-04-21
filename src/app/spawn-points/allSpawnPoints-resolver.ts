import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpawnPoint } from './models/spawn-point';
import { SpawnPointsService } from './spawnpoints.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AllSpawnPointsResolver implements Resolve<SpawnPoint[]> {
    constructor(private spawnPointsService: SpawnPointsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SpawnPoint[]> {
        return this.spawnPointsService.getSpawnPointList();
    }
}
