import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '@app/pages/game/services/game/game.service';
import { Subscription } from 'rxjs';
import { GameGet } from '@app/pages/game/models/gameGet';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit, OnDestroy {
  gamesSubscription: Subscription;
  getGameUserSubscription: Subscription;
  games: GameGet[] = [];
  pathNotImage = 'assets/img/image-not-found.png';

  constructor(private gameService: GameService) {
    this.gameService.getGameUser().subscribe();
    this.gamesSubscription = this.gameService.gamesSubject.subscribe(games => {
      this.games = games.map(game => {
        if (!game.cover) {
          game.cover = this.pathNotImage;
        }
        return game;
      });
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.gamesSubscription.unsubscribe();
    if (this.getGameUserSubscription) {
      this.getGameUserSubscription.unsubscribe();
    }
  }
}
