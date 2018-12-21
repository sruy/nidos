import { TestBed } from '@angular/core/testing';

import { SpawnPointsService } from './spawnpoints.service';

describe('SpawnPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpawnPointsService = TestBed.get(SpawnPointsService);
    expect(service).toBeTruthy();
  });
});
