import { GameGet } from '@app/pages/game/models/gameGet';

export interface StorageRoomSave {
  roomId: number;
  socketId: number;
  game: GameGet;
  userId: number;
}
