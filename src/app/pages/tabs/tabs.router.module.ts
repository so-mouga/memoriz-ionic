import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '@app/core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: '@app/pages/user/board/board.module#BoardPageModule',
            canActivate: [AuthGuardService],
          },
        ],
      },
      {
        path: 'game',
        children: [
          {
            path: '',
            loadChildren: '@app/pages/game/game.module#GamePageModule',
            canActivate: [AuthGuardService],
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home/game',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/game',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
