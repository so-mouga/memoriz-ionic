import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPlayerFindComponent } from '@app/pages/room/components/room-player-find/room-player-find.component';
import { RoomPlayerWaitComponent } from '@app/pages/room/components/room-player-wait/room-player-wait.component';
import { RoomUserWaitComponent } from '@app/pages/room/components/room-user-wait/room-user-wait.component';
import { AuthGuardService } from '@app/core/guards/auth-guard.service';
import { UserGuestGuard } from '@app/core/guards/user-guest/user-guest.guard';
import { RoomPlayComponent } from '@app/pages/room/components/room-play/room-play.component';

const routes: Routes = [
  {
    path: 'create',
    component: RoomUserWaitComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'find',
    component: RoomPlayerFindComponent,
  },
  {
    path: 'instructions',
    component: RoomPlayerWaitComponent,
    canActivate: [UserGuestGuard],
  },
  {
    path: 'play',
    component: RoomPlayComponent,
    canActivate: [UserGuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRouterModule {}
