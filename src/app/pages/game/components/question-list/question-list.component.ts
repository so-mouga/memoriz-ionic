import { Component, Input, OnInit } from '@angular/core';
import { QuizzClass } from '@app/pages/game/models/quizz.class';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  @Input() questions: QuizzClass[];

  constructor() {}

  ngOnInit() {}

  onDisplayMore() {
    console.log('display');
  }
}
