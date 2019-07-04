import { QuestionAdd } from '@app/pages/game/models/questionAdd';
import { TagAdd } from '@app/pages/game/models/tagAdd';
import { QuizzAddForm } from '@app/pages/game/models/quizzAddForm';
import { QuestionGet } from '@app/pages/game/models/questionGet';

export class QuizzClass implements QuestionAdd {
  public correctAnswers: string[] = [];
  public gameType = 'quizz';
  public incorrectAnswers: string[] = [];
  public media: string;
  public question: string;
  public resource: string;
  public resourceMedia: File;
  public tags: TagAdd[];
  public userId: string;

  constructor() {
    this.correctAnswers = [];
    this.incorrectAnswers = [];
  }

  makeQuestion(quizz: QuizzAddForm) {
    this.userId = quizz.userId;
    this.tags = quizz.tags;
    this.resourceMedia = quizz.resourceMedia;
    this.resource = quizz.resource;
    this.question = quizz.question;
    this.media = quizz.media;

    quizz.answers.forEach(answer => {
      if (answer.isCorrectAnswer === true) {
        this.correctAnswers.push(answer.answer);
        return;
      }
      this.incorrectAnswers.push(answer.answer);
    });
  }

  makeQuizz(quizz: QuestionGet) {
    Object.assign(this, quizz);
  }
}
