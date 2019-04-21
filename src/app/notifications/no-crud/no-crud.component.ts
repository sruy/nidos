import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Notification } from '../model/notification';
import { NotificationsService } from '../notifications.service';
import * as moment from 'moment';

@Component({
  selector: 'app-no-crud',
  templateUrl: './no-crud.component.html',
  styleUrls: ['./no-crud.component.css']
})
export class NoCrudComponent implements OnInit {
  form: FormGroup;
  date: moment.Moment = moment();
  title: string = '';
  message: string = '';
  paramNotification: Notification;

  constructor(private fb: FormBuilder, private noService: NotificationsService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.fb.group({
      date: [this.date.toDate(), Validators.required],
      title: [this.title, Validators.required],
      richMessage: [this.message, Validators.required]
    });

    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.noService.getNotification(id).subscribe((notification: Notification) => {
        this.paramNotification = notification;

        this.form.setValue({
          date: notification.date.format('yyyy-MM-ddThh:mm:ss'),
          title: notification.title,
          richMessage: notification.richMessage
        });
      });
    }
  }

  save(event) {
    if (this.form.valid) {
      let saveSub;
      
      if (this.paramNotification) {
        saveSub = this.noService.editNotification(this.paramNotification.notifId, this.form.value, this.messageService);
      } else {
        // New Point
        saveSub = this.noService.newNotification(new Notification(this.form.value), this.messageService);

        this.clearForm();
      }

      saveSub.subscribe(result => {
        window.setTimeout(() => {
          this.router.navigate(['home']);
        }, 2500);
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }

  clearForm() {
    this.form.reset();
  }

  backToList() {
    window.history.back();
  }
}
