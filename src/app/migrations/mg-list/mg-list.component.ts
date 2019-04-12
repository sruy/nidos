import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Migration } from '../model/migration';
import { MigrationsService } from '../migrations.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mg-list',
  templateUrl: './mg-list.component.html',
  styleUrls: ['./mg-list.component.scss']
})
export class MgListComponent implements OnInit {
  @Input() mode: string;
  list: Migration[] = [];
  paginatedList: Migration[] = [];

  constructor(private migrationsService: MigrationsService, private router: Router,
    private messageService: MessageService) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimas migraciones agregadas' || 'Migraciones de nidos';
  }

  ngOnInit() {
    this.migrationsService.getMigrationsList().subscribe(points => {
      this.list = points;

      if (this.list && this.list.length && this.list.length > 0) {
        this.paginatedList = this.list.slice(0, this.mode !== 'compact' && 10 || 5);
      }
    });
  }

  paginateMigrations(event) {
    this.paginatedList = this.list.slice(event.first, (!!event.first && event.first * event.rows) || event.rows);
  }

  editMigration(migration: Migration) {
    if (!!migration && migration.migrationId) {
      this.router.navigate(['/edit-migration', migration.migrationId]);
    }
  }

  deleteMigration(migration: Migration) {
    if (!!migration && migration.migrationId) {
      this.migrationsService.disableMigration(Number.parseInt(migration.migrationId), migration.visibleName, this.messageService).subscribe(result => {
        this.migrationsService.getMigrationsList().subscribe(points => {
          this.list = points;
          this.paginatedList = points.slice(0, this.mode !== 'compact' && 10 || 5);
        })
      });
    }
  }
}
