import { TagAdd } from '@app/pages/game/models/tagAdd';

export interface QuestionAdd {
  userId: string;
  question: string;
  gameType: string;
  incorrectAnswers: string[];
  correctAnswers: string[];
  media: string;
  resource: string;
  resourceMedia: File;
  tags: TagAdd[];
}
