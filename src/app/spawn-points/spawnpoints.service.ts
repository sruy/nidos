import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpawnPoint } from './models/spawn-point';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';
import { FetchType } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class SpawnPointsService {
  backendList: Observable<any>;
  backendSingle: string;
  backendCreate: string;
  backendModify: string;
  backendRemove: string;

  static cachedSpawnPoints: SpawnPoint[];
  static id: number = 100;
  constructor(private http: HttpClient, private apollo: Apollo) {
    this.backendList = this.apollo.subscribe({
      query: gql`
query {
  allSpawnPoints(where: {statusId: [1,3,4,5]}) {
    pointId
    city {
      id
      name
    }
    name
    description
    lat
    long
    link
    thirdPartyService
    thirdPartyNestId
    thirdPartyLink
    status {
      id
      name
    }
  }
}`});

    this.backendSingle = gql`
query singleSpawnPoint($pointId: Int) {
  singleSpawnPoint(pointId: $pointId) {
    pointId
    city {
      id
      name
    }
    name
    description
    lat
    long
    link
    thirdPartyService
    thirdPartyNestId
    thirdPartyLink
    status {
      id
      name
    }
  }
}`;

    this.backendCreate = gql`
mutation createPoint($data: SpawnPointInput) {
  createPoint(data: $data) {
    pointId
    name
    status {
      name
    }
  }
}`;
    this.backendModify = gql`
mutation modifyPoint($pointId: Int, $data: SpawnPointInput) {
  modifyPoint(pointId: $pointId, data: $data) {
    pointId
    name
    status {
      name
    }
  }
}`;

    this.backendRemove = gql`
mutation removePoint($pointId: Int) {
  removePoint(pointId: $pointId) {
    pointId
  }
}`;
  }

  getSpawnPointList() {
    return this.backendList
      .pipe(map(result => {
        const flatten = <SpawnPoint[]>(<any>(<any>result).data).allSpawnPoints;

        return flatten;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  newSpawnPoint(point: SpawnPoint, messageService?: MessageService) {
    const input: any = point;
    const cityId = point.city.id;
    const statusId = 1;
    delete input.pointId;
    delete input.city;
    delete input.status;
    input.cityId = cityId;
    input.statusId = statusId;

    return this.apollo.mutate({
      mutation: this.backendCreate,
      variables: {
        data: input
      }
    })
      .pipe(catchError((err, inp) => {
        if (!!messageService) {
          messageService.add({ severity: 'error', summary: 'No se pudo completar la operación', detail: err.toString().substr(130) });
        }

        return inp;
      }))
      .pipe(map((resultData) => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Spawn Point "${point.name}" agregado!` });
        }
      }));
  }

  getSpawnPoint(pointId: string) {
    return this.apollo.subscribe({
      query: this.backendSingle,
      variables: {
        pointId: Number.parseInt(pointId)
      }
    })
      .pipe(map(result => {
        const flattened = (<any>(<any>result).data).singleSpawnPoint;

        return flattened;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  editSpawnPoint(pointId: string, values: any, messageService: MessageService) {
    const input: any = values;
    const cityId = values.city.id;
    delete input.city;
    input.cityId = cityId;

    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        pointId: pointId,
        data: input
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Spawn point "${values.name}" editado!` });
        }
      }));
  }

  deleteSpawnPoint(pointId: string, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendRemove,
      variables: {
        pointId: pointId
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Punto eliminado', detail: `Spawn point "${name}" eliminado!` });
        }
      }));
  }

  disableSpawnPoint(pointId: number, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        pointId: pointId,
        data: {
          statusId: 2
        }
      }
    })
      .pipe(map(result => {
        if (!!messageService) {
          messageService.add({ severity: 'success', summary: 'Punto eliminado', detail: `Spawn point "${name}" eliminado!` });
        }
      }));
  }
}
