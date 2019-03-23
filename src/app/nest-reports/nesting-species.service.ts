import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { NestingSpecies } from './models/nesting-species';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class NestingSpeciesService {
  // ToDo: by now, read all species only from the JSON file
  staticAssets = this.http.get('/assets/nestingspecies.json');
  backendData = this.apollo.subscribe({
    query: gql`
  query { 
    getNestingSpecies {
      id
      name
      nests
    }
  }`});

  constructor(private http: HttpClient, private store: StoreService, private apollo: Apollo) { }

  getAllSpecies() {
    return this.backendData
      .toPromise()
      .catch(err => {
        if (err.status === 0) {
          throw('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
          console.error(err);
        }
      })
      .then(result => result)
      .then(data => {
        return data && (<any>data).data && <NestingSpecies[]>(<any>(<any>data).data.getNestingSpecies);
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
