import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../../shared/service/auth/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email    = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;

    if (email && password) {
      this.authService.signInUser(email, password);
    }
  }

  onLostPassword() {
    console.log('lost password');
  }

  onSignUp() {
    console.log('sign up');
  }

  onLogInGoole() {
    console.log('log in goole');
  }

  onLogInFacebook() {
    console.log('log in facebook');
  }
}
