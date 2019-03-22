import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/shared/class/user';
import * as moment from 'moment';
import { UserService } from '@app/shared/service/user/user.service';
import {NavController} from '@ionic/angular';
import {AuthService} from '@app/shared/service/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user: User;
  signUpForm: FormGroup;
  profilesType: Array<string> = User.getProfilesType();
  errorMessage: string;
  dateMinRequired = moment()
    .subtract(User.AGE_MIN_REQUIRED, 'years')
    .toDate();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private navCtrl: NavController,
    private authService: AuthService,
  ) {
    if (this.authService.isAuthenticated()) {
      this.navCtrl.navigateForward(['/dashboard']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      dateOfBirth: [null, []],
      profileType: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      privacyPolicy: [false, [Validators.requiredTrue]],
      password: [
        '',
        [Validators.required, Validators.pattern(User.REGEX_PASSWORD)],
      ],
    });
  }

  onSubmit() {
    const {
      email,
      password,
      dateOfBirth,
      profileType,
      userName,
      privacyPolicy,
    } = this.signUpForm.value;
    if (privacyPolicy) {
      this.user = new User(userName, dateOfBirth, email, password, profileType);
      this.userService.createUser(this.user).subscribe(
        user => {
          // @todo redirect user
        },
        error => {
          this.errorMessage = error.error;
        },
      );
    }
  }
}
