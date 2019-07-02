import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() timeLeft: number;
  @Output() timerIsFinished = new EventEmitter();
  intervalTimer;

  constructor() {}

  ngOnInit() {
    this.intervalTimer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalTimer);
        this.timerIsFinished.emit(true);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTimer);
  }
}
