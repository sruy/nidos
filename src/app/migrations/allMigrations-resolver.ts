import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Migration } from './model/migration';
import { MigrationsService } from './migrations.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AllMigrationsResolver implements Resolve<Migration[]> {
    constructor(private migrationsService: MigrationsService, private Router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Migration[]> {
        return this.migrationsService.getMigrationsList();
    }
}