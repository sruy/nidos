import { Migration } from '../../migrations/model/migration';
import { NestingSpecies } from './nesting-species';
import { SpawnPoint } from '../../spawn-points/models/spawn-point';

export class NestReport {
    id: string;
    city: string;
    migration: Migration;
    spawnPoint: SpawnPoint;
    species: NestingSpecies;
    spottedBy: string;
    status: 'confirmed' | 'pending' | 'rejected';
    confirmedBy: string;
    broadcastStatus: string;

    constructor(data: {id: string, city: string, migration: Migration, spawnPoint: SpawnPoint, species: NestingSpecies, spottedBy: string, status: 'confirmed' | 'pending' | 'rejected', confirmedBy: string, broadcastStatus?: string}) {
        this.id = data.id;
        this.city = data.city;
        this.migration = data.migration;
        this.spawnPoint = data.spawnPoint;
        this.species = data.species;
        this.spottedBy = data.spottedBy;
        this.status = data.status;
        this.confirmedBy = data.confirmedBy;
        this.broadcastStatus = data.broadcastStatus;
    }
}
