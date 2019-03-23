import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  {
    path: 'sign-up',
    loadChildren: './auth/sign-up/sign-up.module#SignUpPageModule',
  },
  {
    path: 'log-in',
    loadChildren: './auth/log-in/log-in.module#LogInPageModule',
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
