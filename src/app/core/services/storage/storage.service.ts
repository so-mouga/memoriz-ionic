import { Injectable } from '@angular/core';

export enum KeyStorage {
  APP_SAVE_USER_ROOM_ID = 'memo-riz-quizPins',
  APP_SAVE_PLAYER_GAME_SESSION = 'memo-riz-game_session-player',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }
}
