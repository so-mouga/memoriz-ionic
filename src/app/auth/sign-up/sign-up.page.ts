import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../../shared/class/user';
import * as moment from 'moment';
import {AuthService} from '../../shared/service/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user: User;
  signUpForm: FormGroup;
  profilesType: Array<string> = User.getProfilesType();
  dateMinRequired = moment().subtract(User.AGE_MIN_REQUIRED, 'years').toDate();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      dateOfBirth: ['', [Validators.required]],
      profileType: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      privacyPolicy: ['', [Validators.requiredTrue]],
      password: ['', [Validators.required, Validators.pattern(User.REGEX_PASSWORD)]]
    });
  }

  onSubmit() {
    const { email, password, dateOfBirth, profileType, userName, privacyPolicy} = this.signUpForm.value;
    if (privacyPolicy) {
      this.user = new User(userName, dateOfBirth, email, password, profileType);
      this.authService.createUser(this.user);
    }
  }
}
