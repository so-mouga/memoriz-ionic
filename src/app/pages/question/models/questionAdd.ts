import { TagAdd } from '@app/pages/question/models/tagAdd';

export interface QuestionAdd {
  userId: string;
  question: string;
  gameType: string;
  incorrectAnswers: string[];
  correctAnswers: string[];
  media: string;
  resource: string;
  resourceMedia: string;
  tags: TagAdd[];
}
