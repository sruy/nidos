import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Migration } from '../model/migration';
import { MigrationsService } from '../migrations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mg-crud',
  templateUrl: './mg-crud.component.html',
  styleUrls: ['./mg-crud.component.css']
})
export class MgCrudComponent implements OnInit {
  form: FormGroup;
  id: string;
  visibleName: string;
  startDate: Date;
  endDate: Date;
  comments: string;
  paramMigration: Migration;

  constructor(private fb: FormBuilder, private mgService: MigrationsService, private messageService: MessageService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.id, Validators.required],
      visibleName: [this.visibleName, Validators.required],
      startDate: [this.startDate, Validators.required],
      endDate: [this.endDate],
      comments: [this.comments]
    });

    const migrationId = this.route.snapshot.paramMap.get('id');

    if (migrationId) {
      this.mgService.getMigration(migrationId).then((migration: Migration) => {
        this.paramMigration = migration;

        this.form.setValue({
          id: migration.id,
          visibleName: migration.visibleName,
          startDate: migration.startDate,
          endDate: migration.endDate || '',
          comments: migration.comments || ''
        });
      });
    }
  }

  saveMigration(event) {
    if (this.form.valid) {
      const { id, visibleName, startDate, endDate, comments } = this.form.value;

      if (this.paramMigration) {
        this.mgService.editMigration(this.paramMigration.id, this.form.value, this.messageService);
      } else {
        // New migration
        this.mgService.newMigration(new Migration(
          id, visibleName, startDate, endDate, comments
        ), this.messageService);

        this.clearMigrationForm();
      }

      window.setTimeout(() => {
        this.router.navigate(['migrations']);
      }, 2500);
    } else {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }

  clearMigrationForm() {
    this.form.reset();
  }

  backToList() {
    history.back();
  }
}
