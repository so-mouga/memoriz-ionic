import { QuestionGet } from '@app/pages/game/models/questionGet';
import { UserAuth } from '@app/core/model/userAuth';
import { UserInterface } from '@app/core/model/user';

interface TagQuestionGet {
  id: number;
  name: string;
}

export class QuestionClass implements QuestionGet {
  correctAnswers: string[] = [];
  createdAt: Date;
  id: number;
  incorrectAnswers: string[] = [];
  media: string;
  question: string;
  resource: string;
  resourceMedia: string;
  tags: TagQuestionGet[];
  updatedAt: Date;
  user: UserAuth;

  public makeQuestion(question: QuestionGet) {
    Object.assign(this, question);
  }

  allAnswers(): any[] {
    return this.correctAnswers.concat(this.incorrectAnswers);
  }

  isCorrectAnswer(answer: string): boolean {
    return this.correctAnswers.includes(answer);
  }
}
