import { QuestionGet } from '@app/pages/game/models/questionGet';

export interface GameAddForm {
  userId: number;
  description: string;
  name: string;
  isPrivate: boolean;
  questions: QuestionGet[];
}
