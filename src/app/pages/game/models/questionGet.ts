export interface QuestionGet {
  correctAnswers: string[];
  createdAt: Date;
  updatedAt: Date;
  id: number;
  incorrectAnswers: string[];
  media: string;
  question: string;
  resource: string;
  resourceMedia: string;
  tags: TagQuestionGet[];
  user: UserQuestionGet;
}

interface TagQuestionGet {
  id: number;
  name: string;
}

interface UserQuestionGet {
  id: number;
  userName: string;
}
