import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { QuestionGet } from '@app/pages/game/models/questionGet';
import { QuestionService } from '@app/pages/game/services/question/question.service';
import { QuestionClass } from '@app/core/model/question.class';
import { Action, RoomService } from '@app/pages/room/services/room/room.service';
import { SocketResponse } from '@app/core/model/socketResponse';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Event } from '@app/core/services/socket/socket.service';

@Component({
  selector: 'app-room-play',
  templateUrl: './room-play.component.html',
  styleUrls: ['./room-play.component.scss'],
})
export class RoomPlayComponent implements OnInit, OnDestroy {
  question = new QuestionClass();
  randomAnswers: any[] = [];
  timeLeft = 20;
  currentQuestionSubscription: Subscription;
  hasAnswered = null;
  startQuizz = false;

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {
    this.roomService.deleteRoomUser();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    return false;
  }

  constructor(
    private navCtrl: NavController,
    private questionService: QuestionService,
    private roomService: RoomService,
  ) {
    if (!roomService.room) {
      this.navCtrl.navigateForward(['/home/game']);
    }
    this.roomService.initSocketRoom();
  }

  ngOnInit() {
    if (this.roomService.isUserCreateRoom()) {
      this.roomService.getQuestionPlay();
    }
    this.listenSocket();
  }

  timerIsFinished(isFinished: boolean) {
    if (isFinished && this.startQuizz === true) {
      this.roomService.sendAnswerPlayer(
        this.hasAnswered,
        this.question.id,
        this.question.isCorrectAnswer(this.hasAnswered),
      );
      if (this.roomService.isUserCreateRoom()) {
        this.roomService.getQuestionPlay();
      }
      this.hasAnswered = null;
    }
  }

  answerPlayer(answer: string) {
    this.hasAnswered = answer;
  }

  listenSocket() {
    this.currentQuestionSubscription = this.roomService
      .onMessage(Action.ROOM_PLAY_GET_QUESTION)
      .subscribe((message: SocketResponse<QuestionGet>) => {
        if (message.success) {
          this.startQuizz = true;
          this.question.makeQuestion(message.data);
          this.randomAnswers = this.shuffle(this.question.allAnswers());
        } else {
          this.startQuizz = false;
          this.navCtrl.navigateForward(['/room/score']);
          this.roomService.getSocket.removeListener(Action.ROOM_PLAY_GET_QUESTION);
          this.currentQuestionSubscription.unsubscribe();
        }
      });
  }

  private shuffle(a: any[]): any[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  ngOnDestroy(): void {
    if (this.roomService.isUserCreateRoom()) {
      this.roomService.deleteRoomUser();
    }
    this.currentQuestionSubscription.unsubscribe();
  }
}
