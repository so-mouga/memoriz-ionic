import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeRouterModule } from '@app/pages/home/home.router.module';
import { HomeComponent } from '@app/pages/home/components/home/home.component';
import { LogInComponent } from '@app/pages/home/components/log-in/log-in.component';
import { SharedModule } from '@app/shared/shared.module';
import { HeaderComponent } from '@app/pages/home/components/header/header.component';
import { SignUpComponent } from '@app/pages/home/components/sign-up/sign-up.component';

@NgModule({
  imports: [HomeRouterModule, SharedModule, CommonModule, FormsModule, IonicModule],
  declarations: [HomeComponent, LogInComponent, HeaderComponent, SignUpComponent],
})
export class HomePageModule {}
