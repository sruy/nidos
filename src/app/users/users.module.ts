import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsLoginComponent } from './us-login/us-login.component';
import { UsPublicComponent } from './us-public/us-public.component';
import { UsSignUpComponent } from './us-sign-up/us-sign-up.component';
import { UILibsModule } from '../uilibs/uilibs.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { NestReportsModule } from '../nest-reports/nest-reports.module';
import { UsersService } from './users.service';
import { UsNotAuthorizedComponent } from './us-not-authorized/us-not-authorized.component';

@NgModule({
  declarations: [UsLoginComponent, UsPublicComponent, UsSignUpComponent, UsNotAuthorizedComponent],
  exports: [UsLoginComponent, UsPublicComponent, UsSignUpComponent],
  imports: [
    CommonModule,
    UILibsModule,
    NotificationsModule,
    NestReportsModule
  ],
  providers: [
    { provide: UsersService, useClass: UsersService }
  ]
})
export class UsersModule { }
