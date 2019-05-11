import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { NestingSpecies } from './models/nesting-species';
import { NestingSpeciesService } from './nesting-species.service';
import { Observable } from 'rxjs';

@Injectable()
export class AllSpeciesResolver implements Resolve<NestingSpecies[]> {
    constructor(private nestingSpeciesService: NestingSpeciesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NestingSpecies[]> {
        return this.nestingSpeciesService.getAllSpecies();
    }
}