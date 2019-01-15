import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Notification } from './model/notification';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient, private store: StoreService) { }

  getNotificationList() {
    return this.http.get('/assets/notifications.json')
      .toPromise()
      .then(result => <Notification[]> result)
      .then(data => {
        if (!this.store.read('notifications')) {
          this.store.save('notifications', data);
        }

        if (data !== this.store.read('notifications')) {
          const storeData = this.store.read('notifications');

          return storeData;
        }

        return data;
      });
  }

  getNotification(id: string) {
    return this.getNotificationList().then((list: Notification[]) => {
      let notification: Notification;

      list.forEach((eachNotification: Notification) => {
        if (eachNotification.id === id) {
          notification = eachNotification;
        }
      });

      return notification;
    });
  }

  newNotification(notification: Notification, messageService: MessageService) {

  }

  editNotification(id: string, values: any, messageService: MessageService) {

  }
}
