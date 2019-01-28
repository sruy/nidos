import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Notification } from '../model/notification';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-no-crud',
  templateUrl: './no-crud.component.html',
  styleUrls: ['./no-crud.component.css']
})
export class NoCrudComponent implements OnInit {
  form: FormGroup;
  date: Date = new Date();
  title: string = '';
  message: string = '';
  paramNotification: Notification;

  constructor(private fb: FormBuilder, private noService: NotificationsService,
    private route: ActivatedRoute, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: [this.date, Validators.required],
      title: [this.title, Validators.required],
      message: [this.message, Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.noService.getNotification(id).then((notification: Notification) => {
        this.paramNotification = notification;

        this.form.setValue({
          date: notification.date.toISOString(),
          title: notification.title,
          message: notification.richMessage
        });
      });
    }
  }

  save(event) {
    if (this.form.valid) {
      if (this.paramNotification) {
        this.noService.editNotification(this.paramNotification.id, this.form.value, this.messageService);

        window.setTimeout(() => {
          this.router.navigate(['notifications']);
        }, 2500);
      } else {
        // New Point
        this.noService.newNotification(new Notification(this.form.value), this.messageService);

        this.clearForm();
      }
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
