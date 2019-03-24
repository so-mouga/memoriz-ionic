import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '@app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'board',
        children: [
          {
            path: '',
            loadChildren: '../dashboard/dashboard.module#DashboardPageModule',
            canActivate: [AuthGuardService],
          },
        ],
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: '../game/create/create.module#CreatePageModule',
            canActivate: [AuthGuardService],
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            loadChildren: '../user/board/board.module#BoardPageModule',
            canActivate: [AuthGuardService],
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home/board',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/board',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
