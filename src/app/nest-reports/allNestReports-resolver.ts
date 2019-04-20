import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NestReport } from './models/nest-report';
import { NestReportsService } from './nest-reports.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AllNestReportsResolver implements Resolve<NestReport[]> {
    constructor(private nestReportsService: NestReportsService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NestReport[]> {
        return this.nestReportsService.getNestReportsList();
    }
}
