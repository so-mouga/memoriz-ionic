import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '@app/pages/room/services/room/room.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-room-user-wait',
  templateUrl: './room-user-wait.component.html',
  styleUrls: ['./room-user-wait.component.scss'],
})
export class RoomUserWaitComponent implements OnInit, OnDestroy {
  errorMessage: string;
  gameId: number;
  roomId: number;
  players: PlayerRoom[] = [];

  playersSubscription: Subscription;
  roomSubscription: Subscription;
  socketStateSubscription: Subscription;

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {
    this.roomService.deleteRoomUser();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    return false;
  }

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.gameId = params.gameId;
    });
    if (this.gameId) {
      this.roomService.initSocketRoom();
      this.roomSubscription = this.roomService.createRoom(this.gameId).subscribe(
        roomId => {
          this.roomId = roomId;
          this.listenSocket();
        },
        error => (this.errorMessage = error),
      );
    } else {
      this.errorMessage = 'Hmm ... nous ne semblons pas pouvoir trouver ce quizz.';
    }
  }

  listenSocket() {
    this.socketStateSubscription = this.roomService.socketState.subscribe(value => {
      if (value === false) {
        this.errorMessage = 'Un erreur est survenue';
        this.presentAlert().then(p => {
          p.onDidDismiss().then(() => {
            this.navCtrl.navigateForward(['/home']);
            this.roomService.removeGameSessionStorage();
          });
          p.present();
        });
      }
    });
    this.playersSubscription = this.roomService.getPlayersSubject.subscribe(players => {
      this.players = players.filter(player => player.id !== this.authService.currentAuthenticationValue.id);
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
    this.roomService.deleteRoomUser();
    this.roomSubscription.unsubscribe();
    this.socketStateSubscription.unsubscribe();
    this.playersSubscription.unsubscribe();
  }
}
