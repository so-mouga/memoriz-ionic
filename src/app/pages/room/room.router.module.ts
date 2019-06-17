import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomPlayerFindComponent } from '@app/pages/room/components/room-player-find/room-player-find.component';
import { RoomPlayerWaitComponent } from '@app/pages/room/components/room-player-wait/room-player-wait.component';
import { RoomUserWaitComponent } from '@app/pages/room/components/room-user-wait/room-user-wait.component';
import { AuthGuardService } from '@app/core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'create',
    component: RoomUserWaitComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'find',
    component: RoomPlayerFindComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'instructions',
    component: RoomPlayerWaitComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRouterModule {}
