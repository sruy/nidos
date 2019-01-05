import { Migration } from '../../migrations/model/migration';
import { NestingSpecies } from './nesting-species';
import { SpawnPoint } from '../../spawn-points/models/spawn-point';

export class NestReport {
    id: string;
    migration: Migration;
    spawnPoint: SpawnPoint;
    species: NestingSpecies;
    spottedBy: string;
    status: 'confirmed' | 'pending' | 'rejected';
    confirmedBy: string;
    broadcastStatus: string;
}
