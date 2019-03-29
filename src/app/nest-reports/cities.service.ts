import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { City } from './models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  backendList: Observable<any>;
  backendSingle: string;

  constructor(private apollo: Apollo) { 
    this.backendList = this.apollo.watchQuery({
      query: gql`
query {
  allCities {
    id
    name
  }
}`}).valueChanges;

    this.backendSingle = gql`
query singleCity($id: Int) {
  singleCity(id: $id) {
    id
    name
    extraInfo
  }
}`;
  }

  getAllCities() {
    return this.backendList
      .pipe(map(result => {
        const flatten = <City[]>(<any>(<any>result).data).allCities;

        return flatten;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  getCity(id: number) {
    return this.apollo.watchQuery({
      query: this.backendSingle,
      variables: {
        id: id
      }
    }).valueChanges
    .pipe(map(result => {
      const flatten = <City>(<any>(<any>result).data).singleCity;

      return flatten;
    }))
    .pipe(catchError((err, inp) => {
      throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
      console.error(err);
      return inp;
    }));
  }
}
