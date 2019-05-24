import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomePageModule', pathMatch: 'full' },
  {
    path: 'sign-up',
    loadChildren: '@app/pages/auth/sign-up/sign-up.module#SignUpPageModule',
  },
  {
    path: 'log-in',
    loadChildren: '@app/pages/auth/log-in/log-in.module#LogInPageModule',
  },
  {
    path: 'home',
    loadChildren: '@app/pages/tabs/tabs.module#TabsPageModule',
  },
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
