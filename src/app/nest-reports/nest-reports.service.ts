import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { NestReport } from './models/nest-report';

@Injectable({
  providedIn: 'root'
})
export class NestReportsService {

  constructor(private http: HttpClient, private store: StoreService) { }

  getNestReportsList() {
    return this.http.get('/assets/nestreports.json')
      .toPromise()
      .then(result => <NestReport[]> result)
      .then(data => {
        if (!this.store.read('nestReports')) {
          this.store.save('nestReports', data);
        }

        if (data !== this.store.read('nestReports')) {
          const storeData = this.store.read('nestReports');

          return storeData;
        }

        return data;
      });
  }
}
