import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameAdd } from '@app/pages/game/models/gameAdd';
import { GameGet } from '@app/pages/game/models/gameGet';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/games`;

  constructor(private http: HttpClient) {}

  createGame(game: GameAdd): Observable<GameGet> {
    return this.http.post<any>(`${this.endpoint}`, game).pipe(
      tap((data: GameGet) => {
        return data;
      }),
    );
  }
}
