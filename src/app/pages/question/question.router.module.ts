import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizzComponent } from '@app/pages/question/components/add-quizz/add-quizz.component';
import { QuestionPage } from '@app/pages/question/question.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionPage,
  },
  {
    path: 'add',
    component: AddQuizzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
