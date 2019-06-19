import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Action, RoomService } from '@app/pages/room/services/room/room.service';
import { el } from '@angular/platform-browser/testing/src/browser_util';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { RoomCreated } from '@app/pages/room/models/roomCreated';
import { NavController } from '@ionic/angular';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-room-player-find',
  templateUrl: './room-player-find.component.html',
  styleUrls: ['./room-player-find.component.scss'],
})
export class RoomPlayerFindComponent implements OnInit, OnDestroy {
  roomForm: FormGroup;
  error: string;
  roomSubscription: Subscription;
  roomIsFind = false;
  urlRedirection = '/';
  roomId: number;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private navCtrl: NavController,
    private authService: AuthService,
  ) {
    if (this.authService.currentAuthenticationValue) {
      this.urlRedirection = '/home/game';
    }
  }

  ngOnInit() {
    this.roomService.initSocketRoom();
    this.initForm();
  }

  initForm() {
    this.roomForm = this.formBuilder.group({
      roomId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.authService.currentAuthenticationValue) {
      this.formUserConnected();
    } else {
      this.formGuestPlayer();
    }
  }

  ngOnDestroy() {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
  }

  private formUserConnected() {
    this.roomSubscription = this.roomService
      .joinRoom(this.roomForm.value.roomId, this.authService.currentAuthenticationValue)
      .subscribe(message => {
        if (!message.success) {
          this.error = message.message;
          this.roomService.getSocket.removeListener(Action.ROOM_PLAYER_JOIN);
        } else {
          this.roomService.saveGameSession(message.data, this.authService.currentAuthenticationValue);
          this.navCtrl.navigateForward(['/room', 'instructions']);
        }
      });
  }

  private formGuestPlayer() {
    this.roomSubscription = this.roomService.findRoom(this.roomForm.value.roomId).subscribe(data => {
      this.roomService.getSocket.removeListener(Action.ROOM_FIND);
      if (!data.success) {
        this.error = data.message;
      } else {
        this.error = '';
        this.roomIsFind = true;
        this.roomId = data.data.roomId;
      }
    });
  }
}
