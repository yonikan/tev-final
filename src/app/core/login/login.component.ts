import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  username = null;
  password = null;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      usernameText: new FormControl(this.username, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      passwordText: new FormControl(this.password, {
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
  }

  onLogin() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
  }
}
