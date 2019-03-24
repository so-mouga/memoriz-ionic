import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/service/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  constructor(private authService: AuthService, private navCtrl: NavController) {}

  ngOnInit() {}

  onLogOut() {
    this.authService.clearToken();
    this.navCtrl.navigateRoot('login');
  }
}
