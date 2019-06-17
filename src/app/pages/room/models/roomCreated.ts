import { GameGet } from '@app/pages/game/models/gameGet';
import { SocketResponse } from '@app/core/model/socketResponse';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';

export interface RoomCreated extends SocketResponse<RoomCreated> {
  roomId: number;
  socketId: number;
  game: GameGet;
  userId: number;
  players: PlayerRoom[];
}
