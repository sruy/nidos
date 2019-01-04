import { Component, OnInit } from '@angular/core';
import { NestReport } from '../models/nest-report';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Migration } from '../../migrations/model/migration';
import { MigrationsService } from '../../migrations/migrations.service';
import { NestingSpecies } from '../models/nesting-species';
import { NestingSpeciesService } from '../nesting-species.service';
import { SpawnPoint } from '../../spawn-points/models/spawn-point';
import { SpawnPointsService } from '../../spawn-points/spawnpoints.service';

@Component({
  selector: 'app-nr-crud',
  templateUrl: './nr-crud.component.html',
  styleUrls: ['./nr-crud.component.scss']
})
export class NrCrudComponent implements OnInit {
  form: FormGroup;
  migration: Migration;
  spawnPoint: SpawnPoint;
  species: NestingSpecies;
  spottedBy: string;
  status: string = 'confirmed';
  confirmedBy: string;
  broadcastStatus: string;
  registeredMigrations: Migration[];
  registeredSpawnPoints: SpawnPoint[];
  nestingSpecies: NestingSpecies[];
  statusOptions = [
    { label: 'Confirmado', value: 'confirmed' },
    { label: 'Pendiente', value: 'pending' },
    { label: 'Rechazado', value: 'rejected' }];
  editingReport = false;

  constructor(private fb: FormBuilder, private mgService: MigrationsService,
    private spService: SpawnPointsService, private nsService: NestingSpeciesService) { }

  ngOnInit() {
    this.mgService.getMigrationsList().then((migrationList) => {
      this.registeredMigrations = migrationList;
    });

    this.spService.getSpawnPointList().then((pointList) => {
      this.registeredSpawnPoints = pointList;
    });

    this.nsService.getAllSpecies().then((speciesList) => {
      this.nestingSpecies = speciesList;
    });

    this.form = this.fb.group({
      migration: [this.migration && this.migration.id, Validators.required],
      spawnPoint: [this.spawnPoint && this.spawnPoint.pointId, Validators.required],
      species: [this.species && this.species.id, Validators.required],
      spottedBy: [this.spottedBy, Validators.required],
      status: [this.status],
      confirmedBy: [this.confirmedBy],
      broadcastStatus: [this.broadcastStatus]
    });
  }

  clearForm() {
    this.form.reset();
  }

  backToList() {
    history.back();
  }

  searchMigration(event: any) {
    this.mgService.getMigrationsList().then((list) => {
      this.registeredMigrations = list.filter((migration) => {
        return migration.id.lastIndexOf(event.query) !== -1 || migration.visibleName.lastIndexOf(event.query) !== -1;
      }) || [];
    });
  }
  
  selectMigration(event) {
    this.migration = event;
  }

  searchSpecies(event: any) {
    this.nsService.getAllSpecies().then((list) => {
      this.nestingSpecies = list.filter((species) => {
        return species.name.toLowerCase().lastIndexOf(event.query.toLowerCase()) !== -1;
      }) || [];
    });
  }

  selectSpecies(event) {
    this.species = event;
  }

  searchSpawnPoints(event) {
    this.spService.getSpawnPointList().then(list => {
      this.registeredSpawnPoints = list.filter((point: SpawnPoint) => {
        return point.name.toLowerCase().lastIndexOf(event.query.toLowerCase()) !== -1;
      });
    });
  }

  selectSpawnPoint(event) {
    this.spawnPoint = event;
  }

  saveReport(event) {
    console.log(this.form.value);
    if (this.form.valid) {

    }
  }
}
