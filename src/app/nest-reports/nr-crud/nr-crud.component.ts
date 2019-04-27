import { Component, OnInit, OnDestroy } from '@angular/core';
import { NestReport } from '../models/nest-report';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Migration } from '../../migrations/model/migration';
import { MigrationsService } from '../../migrations/migrations.service';
import { NestingSpecies } from '../models/nesting-species';
import { NestingSpeciesService } from '../nesting-species.service';
import { SpawnPoint } from '../../spawn-points/models/spawn-point';
import { SpawnPointsService } from '../../spawn-points/spawnpoints.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NestReportsService } from '../nest-reports.service';
import { MessageService } from 'primeng/api';
import { sortAsc } from 'src/app/utils/utils';
import { Status } from 'src/app/models/status';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/models/user';

@Component({
  selector: 'app-nr-crud',
  templateUrl: './nr-crud.component.html',
  styleUrls: ['./nr-crud.component.scss']
})
export class NrCrudComponent implements OnInit, OnDestroy {
  form: FormGroup;
  migration: Migration;
  spawnPoint: SpawnPoint;
  species: NestingSpecies;
  spottedBy: string;
  status: Status = { id: 1, name: 'Enabled' };
  confirmedBy: User;
  broadcastStatus: string;
  migrations: Migration[];
  registeredMigrations: Migration[];
  spawnPoints: SpawnPoint[];
  registeredSpawnPoints: SpawnPoint[];
  nestingSpecies: NestingSpecies[];
  registeredNestingSpecies: NestingSpecies[];
  statusOptions = [];
  editingReport = false;
  paramReport: NestReport;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private mgService: MigrationsService,
    private spService: SpawnPointsService, private nsService: NestingSpeciesService,
    private route: ActivatedRoute, private nrService: NestReportsService,
    private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    // ToDo: refactor in a service
    this.statusOptions = [{
      label: 'Habilitado', value: { id: 1, name: 'Enabled' }
    }, {
      label: 'Deshabilitado', value: { id: 2, name: 'Disabled' }
    }, {
      label: 'Confirmado', value: { id: 3, name: 'Confirmed' }
    }, {
      label: 'Pendiente', value: { id: 4, name: 'Pending' }
    }, {
      label: 'Rechazado', value: { id: 5, name: 'Rejected' }
    }];

    const migrationList = this.route.snapshot.data['migrations'];
    const speciesList = this.route.snapshot.data['nestingSpecies'];
    const pointList = this.route.snapshot.data['spawnPoints'];

    if (migrationList) {
      this.migrations = migrationList;
      this.registeredMigrations = migrationList;
    } else {
      this.subscriptions.push(
        this.mgService.getMigrationsList().subscribe((migrationList) => {
          this.migrations = migrationList;
          this.registeredMigrations = migrationList;
        }));
    }

    if (pointList) {
      this.spawnPoints = pointList;
      this.registeredSpawnPoints = pointList.sort(sortAsc('name'));
    } else {
      this.spService.getSpawnPointList().subscribe((pointList) => {
        this.spawnPoints = pointList;
        this.registeredSpawnPoints = pointList.sort(sortAsc('name'));
      });
    }

    if (speciesList) {
      this.nestingSpecies = speciesList;
      this.registeredNestingSpecies = speciesList;
    } else {
      this.nsService.getFilteredSpecies().subscribe((speciesList) => {
        this.nestingSpecies = speciesList;
        this.registeredNestingSpecies = speciesList;
      });
    }

    this.form = this.fb.group({
      migration: [this.migration && this.migration.migrationId, Validators.required],
      spawnPoint: [this.spawnPoint && this.spawnPoint.pointId, Validators.required],
      species: [this.species && this.species.id, Validators.required],
      spottedBy: [this.spottedBy, Validators.required],
      status: [this.status],
      confirmedBy: [this.confirmedBy],
      broadcastStatus: [this.broadcastStatus]
    });

    const id = +(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.nrService.getNestReport(id).subscribe((report: NestReport) => {
        this.paramReport = report;
        this.confirmedBy = report.confirmedBy;
        
        if (!!report) {
          this.editingReport = !this.editingReport;
          this.form.setValue({
            migration: report.migration,
            spawnPoint: report.spawnPoint,
            species: report.species,
            spottedBy: report.spottedBy || '',
            status: report.status || { id: 3, name: 'Confirmed' },
            confirmedBy: report.confirmedBy || null,
            broadcastStatus: report.broadcastStatus || ''
          });
        }
      });
    } else {
      this.confirmedBy = UsersService.authUser;
      this.form.get('confirmedBy').patchValue(this.confirmedBy);
    }
  }

  ngOnDestroy() {
    this.form.reset();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  clearForm() {
    this.form.reset();
  }

  backToList() {
    history.back();
  }

  searchMigration(event: any) {
    this.registeredMigrations = this.migrations.filter((migration) => {
      return migration.migrationId.toString().lastIndexOf(event.query) !== -1 || migration.visibleName.lastIndexOf(event.query) !== -1;
    }) || this.migrations;
  }

  selectMigration(event) {
    this.migration = event;
  }

  searchSpecies(event: any) {
    this.registeredNestingSpecies = this.nestingSpecies.filter((species) => {
      return species.name.toLowerCase().lastIndexOf(event.query.toLowerCase()) !== -1;
    }) || this.nestingSpecies;
  }

  selectSpecies(event) {
    this.species = event;
  }

  searchSpawnPoints(event) {
    this.registeredSpawnPoints = this.spawnPoints.sort(sortAsc('name')).filter((point: SpawnPoint) => {
      return point.name.toLowerCase().lastIndexOf(event.query.toLowerCase()) !== -1;
    });
  }

  selectSpawnPoint(event) {
    this.spawnPoint = event;
  }

  saveReport(event) {
    if (this.form.valid) {
      let saveSub;

      if (this.paramReport && this.editingReport) {
        saveSub = this.nrService.editReport(this.paramReport.reportId, this.form.value, this.messageService);
      } else {
        saveSub = this.nrService.newReport(new NestReport(this.form.value), this.messageService);

        this.clearForm();
      }

      saveSub.subscribe(result => {
        window.setTimeout(() => {
          this.router.navigate(['reports']);
        }, 2500);
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Chequea que los campos con (*) hayan sido rellenados.' });
    }
  }
}
