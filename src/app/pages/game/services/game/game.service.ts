import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GameAdd } from '@app/pages/game/models/gameAdd';
import { GameGet } from '@app/pages/game/models/gameGet';
import { AuthService } from '@app/core/services/auth/auth.service';
import { TagGet } from '@app/pages/game/models/tagGet';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseEndpoint = environment.domain_server;
  protected readonly endpoint = `${this.baseEndpoint}/api/games`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createGame(game: GameAdd): Observable<GameGet> {
    return this.http.post<any>(`${this.endpoint}`, game).pipe(
      tap((data: GameGet) => {
        return data;
      }),
    );
  }

  public getGameUser(): Observable<GameGet[]> {
    return this.http.get(`${this.endpoint}/?userId=${this.authService.currentAuthenticationValue.id}`).pipe(
      map((data: GameGet[]) => {
        return data;
      }),
    );
  }
}
