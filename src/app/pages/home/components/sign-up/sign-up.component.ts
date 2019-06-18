import { Component, OnInit } from '@angular/core';
import { User } from '@app/core/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '@app/core/services/user/user.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User;
  profilesKey = Object.keys;
  profilesLabel = User.PROFILES;
  signUpForm: FormGroup;
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
    if (this.authService.currentAuthenticationValue) {
      this.navCtrl.navigateForward(['/home', 'game']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      dateOfBirth: [null, []],
      profileType: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      privacyPolicy: [false, [Validators.requiredTrue]],
      password: ['', [Validators.required, Validators.pattern(User.REGEX_PASSWORD)]],
    });
  }

  onSubmit() {
    const { privacyPolicy, email, password } = this.signUpForm.value;
    if (privacyPolicy) {
      this.userService.createUser(this.signUpForm.value).subscribe(
        user => {
          this.authService
            .logInUser(email, password)
            .subscribe(auth => this.navCtrl.navigateForward(['/home', 'game']));
        },
        error => {
          this.errorMessage = error.error;
        },
      );
    }
  }
}
