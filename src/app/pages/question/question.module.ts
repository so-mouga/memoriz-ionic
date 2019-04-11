import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPage } from './question.page';
import { QuestionRoutingModule } from '@app/pages/question/question.router.module';
import { AddQuizzComponent } from '@app/pages/question/components/add-quizz/add-quizz.component';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, IonicModule, QuestionRoutingModule],
  declarations: [AddQuizzComponent, QuestionPage],
})
export class QuestionPageModule {}
