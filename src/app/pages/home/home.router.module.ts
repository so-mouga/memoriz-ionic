import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/components/home/home.component';
import { LogInComponent } from '@app/pages/home/components/log-in/log-in.component';
import { SignUpComponent } from '@app/pages/home/components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouterModule {}
