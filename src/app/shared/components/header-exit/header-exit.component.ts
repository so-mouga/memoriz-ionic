import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-header-exit',
  templateUrl: './header-exit.component.html',
  styleUrls: ['./header-exit.component.scss'],
})
export class HeaderExitComponent implements OnInit {
  @Input() urlRedirection: string;

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {}

  ngOnInit() {}

  OnExit() {
    this.showAlertMessage().then(p => p.present());
  }

  showAlertMessage() {
    return this.alertCtrl.create({
      message: `Quitter ?`,
      buttons: [
        {
          text: 'Non',
        },
        {
          text: 'Oui',
          handler: () => {
            this.navCtrl.navigateRoot(this.urlRedirection);
          },
        },
      ],
    });
  }
}
