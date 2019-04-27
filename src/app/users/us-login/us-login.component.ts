import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-us-login',
  templateUrl: './us-login.component.html',
  styleUrls: ['./us-login.component.scss']
})
export class UsLoginComponent implements OnInit {
  form: FormGroup;
  userName: string;
  password: string;

  constructor(private fb: FormBuilder, private usersService: UsersService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.userName, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  clearForm() {
    this.form.reset();
  }

  goToSignUp() {
    this.clearForm();
    this.router.navigate(['/signUp']);
  }

  login(event) {
    if (this.form.valid) {
      this.usersService.login(this.form.value, this.messageService).subscribe((result) => {
        if (result && !(<any>result).err) {
          this.router.navigate(['/home']);
        }
      })
    }
  }
}
