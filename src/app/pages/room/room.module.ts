import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoomRouterModule } from '@app/pages/room/room.router.module';
import { SharedModule } from '@app/shared/shared.module';
import { RoomPlayerWaitComponent } from '@app/pages/room/components/room-player-wait/room-player-wait.component';
import { RoomPlayerFindComponent } from '@app/pages/room/components/room-player-find/room-player-find.component';
import { RoomUserWaitComponent } from '@app/pages/room/components/room-user-wait/room-user-wait.component';
import { PlayerDisplayComponent } from '@app/pages/room/components/player-display/player-display.component';
import { RoomPlayerChooseUsernameComponent } from '@app/pages/room/components/room-player-choose-username/room-player-choose-username.component';

@NgModule({
  imports: [RoomRouterModule, CommonModule, FormsModule, IonicModule, SharedModule],
  declarations: [
    RoomPlayerWaitComponent,
    RoomPlayerFindComponent,
    RoomUserWaitComponent,
    PlayerDisplayComponent,
    RoomPlayerChooseUsernameComponent,
  ],
})
export class RoomPageModule {}
