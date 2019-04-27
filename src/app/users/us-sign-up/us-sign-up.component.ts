import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-us-sign-up',
  templateUrl: './us-sign-up.component.html',
  styleUrls: ['./us-sign-up.component.css']
})
export class UsSignUpComponent implements OnInit {
  form: FormGroup;
  userName: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private fb: FormBuilder, private messageService: MessageService,
    private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.userName, Validators.required],
      password: [this.password, Validators.required],
      confirmPassword: [this.confirmPassword],
      email: [this.email, Validators.required],
      firstName: [this.firstName],
      lastName: [this.lastName]
    }, { validators: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  clearForm() {
    this.form.reset();
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  signUp(event) {
    console.log(event);
    if (this.form.valid) {
      this.usersService.registerUser(this.form.value, this.messageService).subscribe((result) => {
        if (result && !(<any>result).err) {
          this.messageService.add({ severity: 'success', summary: 'Registro completado', detail: `Bienvenido a SRUY ${this.form.value.userName}!` });
          UsersService.authUser = result;
          window.setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2500);
        }
      });
    } else {
      if (this.form.hasError('notSame')) {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que las contraseñas coincidan.' });
      } else {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
      }
    }
  }
}
