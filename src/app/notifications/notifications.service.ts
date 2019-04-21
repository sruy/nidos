import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Notification } from './model/notification';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  backendList: string;
  backendCreate: string;
  backendModify: string;
  backendRemove: string;

  constructor(private apollo: Apollo) {
    this.backendList = gql`
query {
  getAllNotifications {
    notifId
    title
    date
    richMessage
    user {
      id
      userName
    }
    status {
      id
      name
    }
  }
}`;

    this.backendCreate = gql`
mutation createNotification($data: NotificationInput) {
  createNotification(data: $data) {
    notifId
    title
    status {
      id
      name
    }
  }
}`;

    this.backendModify = gql`
mutation modifyNotification($id: Int, $data: NotificationInput) {
  modifyNotification(id: $id, data: $data) {
    notifId
    title
    status {
      id
      name
    }
  }
}`;

    this.backendRemove = gql`
mutation removeNotification($id: Int) {
  removeNotification(id: $id) {
    notifId
    title
  }
}`;
  }

  getNotificationList() {
    return this.apollo.subscribe({
      query: this.backendList
    })
      .pipe(map(result => {
        const flatten = <Notification[]>(<any>(<any>result).data).getAllNotifications;

        return flatten;
      }))
      .pipe(catchError((err, inp) => {
        throw ('SRUY: Failed to retrieve platform endpoint data'); // create debug error called SruyException
        console.error(err);
        return inp;
      }));
  }

  getNotification(id: number) {
    // ToDo: add backendSingle query
    return this.getNotificationList().pipe(map(list => {
      let notification: Notification;

      list.forEach((eachNotification: Notification) => {
        if (eachNotification.notifId === id) {
          notification = eachNotification;
        }
      });

      return notification;
    }));
  }

  newNotification(notification: Notification, messageService: MessageService) {
    const input: any = notification;
    const statusId = 1;
    const userId = 1;
    delete input.status;
    delete input.user;
    delete input.notifId;
    input.statusId = statusId;
    input.userId = userId;

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
          messageService.add({ severity: 'success', summary: 'Operación completada', detail: `Notificación "${input.title}" agregada!` });
        }
      }));
  }

  editNotification(id: number, values: any, messageService: MessageService) {
    const input: any = values;
    const statusId = 1;
    const userId = 1;
    delete input.status;
    delete input.user;
    input.statusId = statusId;
    input.userId = userId;

    return this.apollo.mutate({
      mutation: this.backendModify,
      variables: {
        id: id,
        data: input
      }
    })
    .pipe(map(result => {
      if (!!messageService) {
        messageService.add({ severity: 'success', summary: 'Edición completada', detail: `Notificación "${values.title}" editada!` });
      }
    }));
  }

  deleteNotification(id: number, name: string, messageService: MessageService) {
    return this.apollo.mutate({
      mutation: this.backendRemove,
      variables: { id }
    })
    .pipe(map(result => {
      if (!!messageService) {
        messageService.add({ severity: 'success', summary: 'Notificación eliminada', detail: `Notificación "${name}" eliminada!` });
      }
    }));
  }
}
