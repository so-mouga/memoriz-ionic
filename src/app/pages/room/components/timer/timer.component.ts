import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() timer: number;
  @Input() startTimer: boolean;
  @Output() timerIsFinished = new EventEmitter();
  intervalTimer;
  timeLeft;

  constructor() {}

  ngOnInit() {
    if (this.startTimer) {
      this.timeLeft = this.timer;
      this.intervalTimer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          // clearInterval(this.intervalTimer);
          this.timerIsFinished.emit(true);
          this.timeLeft = this.timer;
        }
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer);
  }
}
