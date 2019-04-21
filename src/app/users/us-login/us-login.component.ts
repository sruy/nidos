import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-us-login',
  templateUrl: './us-login.component.html',
  styleUrls: ['./us-login.component.scss']
})
export class UsLoginComponent implements OnInit {
  form: FormGroup;
  userName: string;
  password: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      userName: [this.userName, Validators.required],
      password: [this.password, Validators.required]
    });
  }

  clearForm() {
    this.form.reset();
  }
  
  login(event) {
    console.log(event, this.form.value);
  }

}
