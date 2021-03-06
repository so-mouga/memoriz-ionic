import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { SharedModule } from '@app/shared/shared.module';
import { GameRouterModule } from '@app/pages/game/game.router.module';
import { CreateQuestionComponent } from '@app/pages/game/components/create-question/create-question.component';
import { CreateGameComponent } from '@app/pages/game/components/create-game/create-game.component';
import { QuestionListComponent } from '@app/pages/game/components/question-list/question-list.component';
import { GameListComponent } from '@app/pages/game/components/game-list/game-list.component';

@NgModule({
  imports: [GameRouterModule, SharedModule, CommonModule, FormsModule, IonicModule],
  declarations: [GamePage, CreateQuestionComponent, CreateGameComponent, QuestionListComponent, GameListComponent],
})
export class GamePageModule {}
