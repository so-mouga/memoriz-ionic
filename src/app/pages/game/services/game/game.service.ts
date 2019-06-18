import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameAdd } from '@app/pages/game/models/gameAdd';
import { GameGet } from '@app/pages/game/models/gameGet';
import { AuthService } from '@app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/games`;

  games: GameGet[] = [];
  gamesSubject = new Subject<GameGet[]>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  emitGames() {
    this.gamesSubject.next(this.games);
  }

  createGame(game: GameAdd): Observable<GameGet> {
    return this.http.post<any>(`${this.endpoint}`, game).pipe(
      tap((data: GameGet) => {
        this.games.unshift(data);
        this.emitGames();
        return data;
      }),
    );
  }

  public getGameUser(): Observable<GameGet[]> {
    return this.http.get(`${this.endpoint}/?userId=${this.authService.currentAuthenticationValue.id}`).pipe(
      map((data: GameGet[]) => {
        this.games = data;
        this.emitGames();
        return this.games;
      }),
    );
  }
}
