import { TagAdd } from '@app/pages/game/models/tagAdd';

export interface AnswerQuizzAddForm {
  answer: string;
  isCorrectAnswer: boolean;
}

export interface QuizzAddForm {
  userId: string;
  question: string;
  resource: string;
  resourceMedia: File;
  media: string;
  tags: TagAdd[];
  answers: AnswerQuizzAddForm[];
}
