import { UserAuth } from '@app/core/model/userAuth';

export interface QuestionGet {
  correctAnswers: string[];
  createdAt: Date;
  updatedAt: Date;
  id: number;
  incorrectAnswers: string[];
  media: string;
  question: string;
  resource: string;
  resourceMedia: File;
  tags: TagQuestionGet[];
  user: UserAuth;
}

interface TagQuestionGet {
  id: number;
  name: string;
}
