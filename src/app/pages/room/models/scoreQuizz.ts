import { QuestionGet } from '@app/pages/game/models/questionGet';
import { AnswerUser } from '@app/pages/room/models/answerUser';

export interface ScoreQuizz {
  question: QuestionGet;
  answerPlayers: AnswerUser[];
}
