import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NestingSpecies } from './models/nesting-species';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NestingSpeciesService {
  backendData: Observable<any>;
  backendModify: string;

  constructor(private http: HttpClient, private apollo: Apollo) {
    this.backendData = this.apollo.subscribe({
      query: gql`
    query { 
      getNestingSpecies {
        id
        name
        nests
      }
    }`});

    this.backendModify = gql`
mutation modifySpecies($data: NestingSpeciesInput) {
  modifySpecies(data: $data) {
    id
    name
    nests
  }
}`;
  }

  getAllSpecies() {
    return this.backendData
      .pipe(catchError((err, inp) => {
        if (err.status === 0) {
          console.error('SRUY: Failed to retrieve platform endpoint data', err);
          return inp;
        }
      }))
      .pipe(map(data => {
        return data && (<any>data).data && <NestingSpecies[]>(<any>(<any>data).data.getNestingSpecies);
      }));
  }

  getFilteredSpecies() {
    return this.getAllSpecies()
      .pipe(map(data => {
        return data.filter((species: NestingSpecies) => {
          return !!species.nests;
        });
      }));
  }

  toggleNestingSpecies(id: number, nests: boolean, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        data: { id, nests }
      }
    })
      .pipe(catchError((err, inp) => {
        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }

        return inp;
      }))
      .pipe(map((result) => {
        const resultData = (<any>(<any>result).data).modifySpecies;

        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Especie "${resultData.name}" actualizada!` });
        }
      }));
  }
}
