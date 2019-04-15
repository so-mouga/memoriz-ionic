import { TagAdd } from '@app/pages/question/models/tagAdd';

export interface AnswerQuizzAddForm {
  answer: string;
  isCorrectAnswer: boolean;
}

export interface QuizzAddForm {
  userId: string;
  question: string;
  resource: string;
  resourceMedia: string;
  media: string;
  tags: TagAdd[];
  answers: AnswerQuizzAddForm[];
}
