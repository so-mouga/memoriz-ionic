import { QuestionGet } from '@app/pages/game/models/questionGet';
import { UserAuth } from '@app/core/model/userAuth';

export interface GameGet {
  cover: string;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  description: string;
  name: string;
  isPrivate: boolean;
  questions: QuestionGet[];
  user: UserAuth;
}
