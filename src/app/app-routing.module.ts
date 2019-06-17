import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '@app/pages/home/home.module#HomePageModule' },
  {
    path: 'home',
    loadChildren: '@app/pages/tabs/tabs.module#TabsPageModule',
  },
  { path: 'room', loadChildren: './pages/room/room.module#RoomPageModule' },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
