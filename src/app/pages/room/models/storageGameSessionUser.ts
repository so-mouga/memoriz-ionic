import { GameGet } from '@app/pages/game/models/gameGet';
import { UserAuth } from '@app/core/model/userAuth';

export interface StorageGameSessionUser {
  roomId: number;
  game: GameGet;
  user: UserAuth;
}
