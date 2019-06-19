import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '@app/pages/room/services/room/room.service';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';

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
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.usernameForm = this.formBuilder.group({
      username: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const player = {
      id: null,
      username: this.usernameForm.value.username,
    };
    this.roomService.joinRoom(this.roomId, player).subscribe(data => {
      if (!data.success) {
        this.error = data.message;
      } else {
        this.authService.setUserGuest(player);
        this.roomService.saveGameSession(data.data, player);
        this.navCtrl.navigateForward(['/room', 'instructions']);
      }
    });
  }
}
