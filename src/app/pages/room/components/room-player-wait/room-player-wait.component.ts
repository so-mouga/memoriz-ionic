import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RoomService, Action } from '@app/pages/room/services/room/room.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Event } from '@app/core/services/socket/socket.service';
import { SocketResponse } from '@app/core/model/socketResponse';
import { Subscription } from 'rxjs';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { el } from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-room-player-wait',
  templateUrl: './room-player-wait.component.html',
  styleUrls: ['./room-player-wait.component.scss'],
})
export class RoomPlayerWaitComponent implements OnInit, OnDestroy {
  errorMessage: string;
  isFiredRoom = false;
  playersSubscription: Subscription;
  socketStateSubscription: Subscription;
  players: PlayerRoom[] = [];

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {
    this.roomService.notifyUserPlayerLeaveRoom();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    return false;
  }

  constructor(
    private roomService: RoomService,
    private navCtrl: NavController,
    private toastController: ToastController,
  ) {
    if (!this.roomService.getGameSession()) {
      this.navCtrl.navigateForward(['/room', 'find']);
    }
  }

  ngOnInit() {
    this.roomService.initSocketRoom();
    this.listenSocket();
  }

  listenSocket() {
    this.socketStateSubscription = this.roomService.socketState.subscribe(value => {
      if (value === false) {
        this.errorMessage = 'Un erreur est survenue';
        this.isFiredRoom = true;
        this.presentAlert().then(p => {
          p.onDidDismiss().then(() => {
            this.navCtrl.navigateForward(['/room', 'find']);
            this.roomService.removeGameSessionStorage();
          });
          p.present();
        });
      }
    });
    this.playersSubscription = this.roomService.getPlayersSubject.subscribe(players => {
      this.players = players;
    });
    this.roomService.onMessage(Action.ROOM_NOTIFY_PLAYER_ROOM_CLOSED).subscribe((message: SocketResponse<null>) => {
      this.errorMessage = message.message;
      this.isFiredRoom = true;
      this.presentAlert().then(p => {
        p.onDidDismiss().then(() => {
          this.navCtrl.navigateForward(['/room', 'find']);
          this.roomService.removeGameSessionStorage();
        });
        p.present();
      });
    });
  }

  async presentAlert() {
    return await this.toastController.create({
      message: this.errorMessage,
      duration: 1000,
      position: 'middle',
    });
  }

  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
    this.socketStateSubscription.unsubscribe();
    if (!this.isFiredRoom) {
      this.roomService.notifyUserPlayerLeaveRoom();
    }
  }
}
