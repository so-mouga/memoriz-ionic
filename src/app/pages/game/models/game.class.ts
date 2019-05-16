import { QuestionGet } from '@app/pages/game/models/questionGet';
import { UserInterface } from '@app/core/model/user';

export class GameClass {
  public user: UserInterface;
  public description: string;
  public name: string;
  public cover: string;
  public isPrivate: boolean;
  public questions: QuestionGet[];
}
