import { NgModule } from '@angular/core';
import { NoInfoComponent } from './no-info/no-info.component';
import { NoCrudComponent } from './no-crud/no-crud.component';
import { UILibsModule } from '../uilibs/uilibs.module';
import { NotificationsService } from './notifications.service';

@NgModule({
  declarations: [NoInfoComponent, NoCrudComponent],
  imports: [
    UILibsModule
  ],
  providers: [
    {provide: NotificationsService, useClass: NotificationsService}
  ],
  exports: [
    NoInfoComponent
  ]
})
export class NotificationsModule { }
