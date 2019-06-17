import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private authService: AuthService) {
    if (this.authService.currentAuthenticationValue) {
      this.navCtrl.navigateForward(['/home', 'game']);
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const { email, password } = this.logInForm.value;
    if (email && password) {
      this.authService
        .logInUser(email, password)
        .subscribe(
          data => this.navCtrl.navigateForward(['/home', 'game']),
          e => (this.errorMessage = 'Votre email ou mot de passe est incorrect.'),
        );
    }
  }

  onLostPassword() {
    // todo create page /password-reset
    // this.navCtrl.navigateForward( ['/password-reset']);
  }
}
