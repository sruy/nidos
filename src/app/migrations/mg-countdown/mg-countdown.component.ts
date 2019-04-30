import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MigrationsService } from '../migrations.service';
import * as tz from 'moment-timezone';
import * as moment from 'moment';
import { Migration } from '../model/migration';

@Component({
  selector: 'app-mg-countdown',
  templateUrl: './mg-countdown.component.html',
  styleUrls: ['./mg-countdown.component.scss']
})
export class MgCountdownComponent implements OnInit, OnDestroy {
  @Input() mode: string;
  currentMigration: Migration;
  timeZone: 'America/Montevideo';
  scheduledMigrationDates: moment.Moment[] = [
    tz('2019-05-01 21:00:00', this.timeZone)
  ];
  timeToScheduledMigration: string = '';
  panelHeader = 'Próxima migración';

  constructor(private migrationsService: MigrationsService) {
    do {
      const lastSaved = this.scheduledMigrationDates[this.scheduledMigrationDates.length - 1].clone();
      
      this.scheduledMigrationDates.push(
        tz(lastSaved.toDate(), this.timeZone).add('14', 'days')
      );
    } while(this.scheduledMigrationDates[this.scheduledMigrationDates.length - 1].isBefore('2022', 'year'));
  }

  ngOnInit() {
    this.migrationsService.getMigrationsList().subscribe((result) => {
      this.currentMigration = result.filter(migration => {
        const todayMigrationHour = moment().hours(21).minutes(0);
        const startDate = moment(Number.parseInt(<any>migration.startDate));
        const endDate = moment(Number.parseInt(<any>migration.endDate));
        
        migration.endDate = endDate;
        migration.startDate = startDate;
        return startDate.hours(21).minutes(0) <= todayMigrationHour && endDate.hours(21).minutes(0) > moment();
      })[0] || result[result.length - 1];

      this.scheduledMigrationDates.forEach((scheduled: moment.Moment) => {
        if (this.currentMigration && scheduled.isAfter(tz(this.timeZone)) && scheduled.isSameOrBefore(this.currentMigration.endDate)) {
          const duration = moment.duration(scheduled.diff(tz(this.timeZone)));
          const durationArray = [];
          if (duration.days() > 1) {
            durationArray.push(`${duration.days()} días`);
          } else if (duration.days()) {
            durationArray.push(`${duration.days()} día`);
          }

          if (duration.hours() > 1) {
            durationArray.push(`${duration.hours()} horas`);
          } else if (duration.hours()) {
            durationArray.push(`${duration.hours()} hora`);
          }

          if (duration.minutes() > 1) {
            durationArray.push(`${duration.minutes()} minutos`);
          } else if (duration.minutes()) {
            durationArray.push(`${duration.minutes()} minuto`);
          }
          
          this.timeToScheduledMigration = durationArray.join(' ');
        }
      });
    });

    

  }

  ngOnDestroy() {

  }

}
