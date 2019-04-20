import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Migration } from '../model/migration';
import { MigrationsService } from '../migrations.service';
import { MessageService } from 'primeng/api';
import { sortAsc, sortDesc } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mg-list',
  templateUrl: './mg-list.component.html',
  styleUrls: ['./mg-list.component.scss']
})
export class MgListComponent implements OnInit, OnDestroy {
  @Input() mode: string;
  list: Migration[] = [];
  paginatedList: Migration[] = [];
  totalRecords: number;
  subsArray: Subscription[] = [];

  constructor(private migrationsService: MigrationsService, private router: Router,
    private messageService: MessageService, private activatedRoute: ActivatedRoute) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimas migraciones agregadas' || 'Migraciones de nidos';
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.data['migrations']) {
      const points = this.activatedRoute.snapshot.data['migrations'];

      this.initList(points);
    } else {
      this.subsArray.push(this.migrationsService.getMigrationsList().subscribe(points => {
        this.initList(points);
      }));
    }
  }

  initList(list: Migration[]) {
    if (this.mode === 'compact') {
      this.list = list.sort(sortDesc('migrationId'));
    } else {
      this.list = list.sort(sortAsc('startDate'));
    }

    this.totalRecords = list.length;

    if (this.list && this.list.length && this.list.length > 0) {
      this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
    }
  }

  ngOnDestroy() {
    this.subsArray.forEach(sub => {
      sub.unsubscribe();
    });
  }

  paginateMigrations(event) {
    this.paginatedList = this.list.slice(event.first, (!!event.first && event.first + event.rows) || event.rows);
  }

  editMigration(migration: Migration) {
    if (!!migration && migration.migrationId) {
      this.router.navigate(['/edit-migration', migration.migrationId]);
    }
  }

  deleteMigration(migration: Migration) {
    if (!!migration && migration.migrationId) {
      this.subsArray.push(this.migrationsService.disableMigration(Number.parseInt(migration.migrationId), migration.visibleName, this.messageService).subscribe(result => {
        this.subsArray.push(this.migrationsService.getMigrationsList().subscribe(points => {
          this.list = points;
          this.paginatedList = points.slice(0, this.mode !== 'compact' && 10 || 5);
        }))
      }));
    }
  }
}
