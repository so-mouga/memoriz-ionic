import { Injectable } from '@angular/core';
import { StorageService, KeyStorage } from '@app/core/services/storage/storage.service';
import { StorageRoomSave } from '@app/pages/room/models/storageRoomSave';
import { SocketService } from '@app/core/services/socket/socket.service';
import { AuthService } from '@app/core/services/auth/auth.service';
import { Observable, Subject } from 'rxjs';
import { RoomCreated } from '@app/pages/room/models/roomCreated';
import { StorageGameSessionUser } from '@app/pages/room/models/storageGameSessionUser';
import { PlayerRoom } from '@app/pages/room/models/playerRoom';
import { SocketResponse } from '@app/core/model/socketResponse';
import { UserAuth } from '@app/core/model/userAuth';
import { User } from '@app/core/model/user';

export enum Action {
  ROOM_FIND = 'room-find',
  ROOM_USER_CREATE = 'room-user-create',
  ROOM_USER_DELETE = 'room-user-delete',
  ROOM_PLAYER_JOIN = 'room-player-join',
  ROOM_PLAYERS_STATUS = 'room-players-status',
  ROOM_USER_REMOVE_PLAYER = 'room-user-remove-player',
  ROOM_NOTIFY_PLAYER_ROOM_CLOSED = 'room-user-leave-notify-players',
  ROOM_NOTIFY_USER_THAT_PLAYER_LEFT = 'room-player-leave-notify-user',
  ROOM_PLAY_START = 'room-play-start',
  ROOM_PLAY_GET_QUESTION = 'room-play-get-question',
}

@Injectable({
  providedIn: 'root',
})
export class RoomService extends SocketService {
  player: UserAuth;
  room: StorageRoomSave;
  private players: PlayerRoom[] = [];
  private playersSubject = new Subject<PlayerRoom[]>();

  constructor(private storageService: StorageService, private authService: AuthService) {
    super();
  }

  emitPlayers() {
    this.playersSubject.next(this.players);
  }

  setPlayer(user: UserAuth) {
    this.player = user;
  }

  public get getPlayersSubject(): Subject<PlayerRoom[]> {
    this.listenPlayers();
    return this.playersSubject;
  }

  private listenPlayers(): void {
    this.onMessage(Action.ROOM_PLAYERS_STATUS).subscribe((message: SocketResponse<PlayerRoom[]>) => {
      this.players = message.data;
      this.emitPlayers();
    });
  }

  public removePlayer(player: PlayerRoom) {
    this.send(
      {
        roomId: this.getRoom().roomId,
        playerId: player.id,
      },
      Action.ROOM_USER_REMOVE_PLAYER,
    );
  }

  public createRoom(gameId: number): Observable<number> {
    return new Observable(observer => {
      this.createRoomAndListenSocket(gameId).subscribe(newRoom => {
        if (newRoom.success) {
          this.players = newRoom.data.players;
          this.emitPlayers();
          observer.next(newRoom.data.roomId);
          observer.complete();
          this.room = newRoom.data;
          this.saveRoomInStorage(newRoom.data);
          return;
        }
        observer.error(newRoom.message);
      });
    });
  }

  private createRoomAndListenSocket(gameId: number): Observable<RoomCreated> {
    this.send(
      {
        gameId: gameId,
        userId: this.authService.currentAuthenticationValue.id,
        user: this.authService.currentAuthenticationValue,
      },
      Action.ROOM_USER_CREATE,
    );

    return this.onMessage(Action.ROOM_USER_CREATE);
  }

  public deleteRoomUser(): void {
    if (this.getRoom()) {
      this.send(
        {
          roomId: this.getRoom().roomId,
        },
        Action.ROOM_USER_DELETE,
      );
    }
    this.storageService.deleteItem(KeyStorage.APP_SAVE_USER_ROOM_ID);
  }

  /**
   * Save game in storage
   */
  public saveGameSession(room: RoomCreated, user: UserAuth): void {
    this.setPlayer(user);
    const data: StorageGameSessionUser = {
      roomId: room.roomId,
      user: user,
      game: room.game,
    };
    this.room = room;
    this.storageService.setItem(KeyStorage.APP_SAVE_USER_ROOM_ID, JSON.stringify(data));
  }

  public removeGameSessionStorage(): void {
    this.storageService.deleteItem(KeyStorage.APP_SAVE_USER_ROOM_ID);
  }

  public saveRoomInStorage(room: StorageRoomSave): void {
    this.storageService.setItem(KeyStorage.APP_SAVE_USER_ROOM_ID, JSON.stringify(room));
  }

  public getRoom(): StorageRoomSave {
    return JSON.parse(this.storageService.getItem(KeyStorage.APP_SAVE_USER_ROOM_ID));
  }

  /**
   * function player join room
   */
  joinRoom(roomId: number, user: UserAuth): Observable<SocketResponse<RoomCreated>> {
    this.send(
      {
        roomId: roomId,
        user: user,
      },
      Action.ROOM_PLAYER_JOIN,
    );
    return this.onMessage(Action.ROOM_PLAYER_JOIN);
  }

  public getGameSession(): StorageGameSessionUser {
    return JSON.parse(this.storageService.getItem(KeyStorage.APP_SAVE_USER_ROOM_ID));
  }

  public notifyUserPlayerLeaveRoom(): void {
    if (this.getGameSession()) {
      this.send(
        {
          user: this.player,
          roomId: this.getGameSession().roomId,
        },
        Action.ROOM_NOTIFY_USER_THAT_PLAYER_LEFT,
      );
    }
    this.removeGameSessionStorage();
  }

  findRoom(roomId: number): Observable<SocketResponse<RoomCreated>> {
    this.send(roomId, Action.ROOM_FIND);
    return this.onMessage(Action.ROOM_FIND);
  }

  public startGame() {
    this.send(this.getGameSession().roomId, Action.ROOM_PLAY_START);
  }

  public getQuestionPlay(questionId: number | null = null) {
    if (!this.room) {
      return;
    }
    this.send({ roomId: this.room.roomId, questionId: questionId }, Action.ROOM_PLAY_GET_QUESTION);
  }
}
