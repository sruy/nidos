import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { NestingSpecies } from './models/nesting-species';

@Injectable({
  providedIn: 'root'
})
export class NestingSpeciesService {
  // ToDo: by now, read all species only from the JSON file
  constructor(private http: HttpClient, private store: StoreService) { }

  getAllSpecies() {
    return this.http.get('/assets/nestingspecies.json')
      .toPromise()
      .then(result => <NestingSpecies[]> result)
      .then(data => {
        return data;
      });
  }

  getFilteredSpecies() {
    return this.getAllSpecies()
      .then(data => {
        return data.filter((species: NestingSpecies) => {
          return !!species.nests;
        });
      });
  }
}
