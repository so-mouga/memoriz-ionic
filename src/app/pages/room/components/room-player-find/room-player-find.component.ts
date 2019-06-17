import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Action, RoomService } from '@app/pages/room/services/room/room.service';
import { el } from '@angular/platform-browser/testing/src/browser_util';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { RoomCreated } from '@app/pages/room/models/roomCreated';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-room-player-find',
  templateUrl: './room-player-find.component.html',
  styleUrls: ['./room-player-find.component.scss'],
})
export class RoomPlayerFindComponent implements OnInit, OnDestroy {
  roomForm: FormGroup;
  error: string;
  roomSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private roomService: RoomService, private navCtrl: NavController) {}

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
    this.roomSubscription = this.roomService.joinRoom(this.roomForm.value.roomId).subscribe(message => {
      if (!message.success) {
        this.error = message.message;
        this.roomService.getSocket.removeListener(Action.ROOM_PLAYER_JOIN);
      } else {
        this.roomService.saveGameSession(message.data);
        this.navCtrl.navigateForward(['/room', 'instructions']);
      }
    });
  }

  ngOnDestroy() {
    if (this.roomSubscription) {
      this.roomSubscription.unsubscribe();
    }
  }
}
