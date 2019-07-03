import { Component, OnDestroy, OnInit } from '@angular/core';
import { Action, RoomService } from '@app/pages/room/services/room/room.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ScoreQuizz } from '@app/pages/room/models/scoreQuizz';
import { SocketResponse } from '@app/core/model/socketResponse';

@Component({
  selector: 'app-room-display-score',
  templateUrl: './room-display-score.component.html',
  styleUrls: ['./room-display-score.component.scss'],
})
export class RoomDisplayScoreComponent implements OnInit, OnDestroy {
  scoreQuizzSubscription: Subscription;
  scores: ScoreQuizz[];

  constructor(private roomService: RoomService, private navCtrl: NavController) {
    if (!roomService.room) {
      this.navCtrl.navigateForward(['/home/game']);
    }
    this.roomService.initSocketRoom();
  }

  ngOnInit() {
    this.roomService.getScoreQuizz();
    this.listenSocket();
  }

  listenSocket() {
    this.scoreQuizzSubscription = this.roomService
      .onMessage(Action.ROOM_PLAY_GET_SCORE_QUIZZ)
      .subscribe((message: SocketResponse<ScoreQuizz[]>) => {
        this.scores = message.data;
      });
  }

  ngOnDestroy(): void {
    if (this.roomService.isUserCreateRoom()) {
      this.roomService.deleteRoomUser();
    }
    this.scoreQuizzSubscription.unsubscribe();
  }
}
