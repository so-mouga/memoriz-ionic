import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '@app/pages/room/services/room/room.service';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-room-player-choose-username',
  templateUrl: './room-player-choose-username.component.html',
  styleUrls: ['./room-player-choose-username.component.scss'],
})
export class RoomPlayerChooseUsernameComponent implements OnInit {
  usernameForm: FormGroup;
  error: string;
  @Input() roomId: number;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  async presentAlert() {
    return await this.toastController.create({
      message: 'Une erreur est survenue',
      duration: 1000,
      position: 'middle',
    });
  }

  onSubmit() {
    const player = {
      id: null,
      username: this.usernameForm.value.username,
    };
    this.roomService.joinRoom(this.roomId, player).subscribe(data => {
      if (!data.success) {
        if (data.message === 'Aucune salle ne correspond à ce code.') {
          this.presentAlert().then(p => {
            p.onDidDismiss().then(() => {
              this.navCtrl.navigateRoot(['/']);
              this.roomService.removeGameSessionStorage();
            });
            p.present();
          });
        } else {
          this.error = data.message;
        }
      } else {
        this.authService.setUserGuest(player);
        this.roomService.saveGameSession(data.data, player);
        this.navCtrl.navigateForward(['/room', 'instructions']);
      }
    });
  }
}
