import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NavController} from '@ionic/angular';
import { AuthService } from '@app/shared/service/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  logInForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
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
    this.logInForm = this.formBuilder.group({
      email: ['userNamfrefd@toto.fr', [Validators.required, Validators.email]],
      password: [
        'password',
        [Validators.required],
      ],
    });
  }

  onSubmit() {
    const { email, password } = this.logInForm.value;

    if (email && password) {
      this.authService.signInUser(email, password).subscribe(
        data => this.navCtrl.navigateForward(['/dashboard']),
        e => this.errorMessage = 'Votre email ou mot de passe est incorrect.'
      );
    }
  }

  onLostPassword() {
    // todo create page /password-reset
    // this.navCtrl.navigateForward( ['/password-reset']);
  }
}
