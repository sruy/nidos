import { Component, OnInit } from '@angular/core';
import { Notification } from '../model/notification';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-no-info',
  templateUrl: './no-info.component.html',
  styleUrls: ['./no-info.component.scss']
})
export class NoInfoComponent implements OnInit {
  notification: Notification;
  panelHeader = 'Última actualización';

  constructor(private noService: NotificationsService) { }

  ngOnInit() {
    this.noService.getNotificationList().then((list) => {
      this.notification = list[list.length - 1];
    });
  }

}
