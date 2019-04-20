import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NestingSpecies } from './models/nesting-species';
import { NestingSpeciesService } from './nesting-species.service';
import { Observable } from 'rxjs';

@Injectable()
export class AllNestingSpeciesResolver implements Resolve<NestingSpecies[]> {
    constructor(private nestingSpeciesService: NestingSpeciesService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NestingSpecies[]> {
        return this.nestingSpeciesService.getFilteredSpecies();
    }
}
