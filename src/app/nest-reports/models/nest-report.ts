import { Migration } from '../../migrations/model/migration';
import { NestingSpecies } from './nesting-species';
import { SpawnPoint } from '../../spawn-points/models/spawn-point';
import { Status } from 'src/app/models/status';

export class NestReport {
    reportId: number;
    migration: Migration;
    spawnPoint: SpawnPoint;
    species: NestingSpecies;
    spottedBy: string;
    status: Status;
    confirmedBy: string;
    broadcastStatus: string;

    constructor(data: {reportId: number, migration: Migration, spawnPoint: SpawnPoint, species: NestingSpecies, spottedBy: string, status: Status, confirmedBy: string, broadcastStatus?: string}) {
        this.reportId = data.reportId;
        this.migration = data.migration;
        this.spawnPoint = data.spawnPoint;
        this.species = data.species;
        this.spottedBy = data.spottedBy;
        this.status = data.status;
        this.confirmedBy = data.confirmedBy;
        this.broadcastStatus = data.broadcastStatus;
    }
}
