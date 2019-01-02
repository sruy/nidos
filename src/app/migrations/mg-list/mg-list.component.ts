import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Migration } from '../model/migration';
import { MigrationsService } from '../migrations.service';

@Component({
  selector: 'app-mg-list',
  templateUrl: './mg-list.component.html',
  styleUrls: ['./mg-list.component.css']
})
export class MgListComponent implements OnInit {
  @Input() mode: string;
  list: Migration[] = [];
  paginatedList: Migration[] = [];

  constructor(private migrationsService: MigrationsService, private router: Router) { }

  get listTitle() {
    return this.mode === 'compact' && 'Últimas migraciones agregadas' || 'Migraciones de nidos';
  }

  ngOnInit() {
  }

  paginateMigrations(event) {

  }

  editMigration(migration: Migration) {

  }

}
