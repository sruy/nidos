import { TestBed } from '@angular/core/testing';

import { NestingSpeciesService } from './nesting-species.service';

describe('NestingSpeciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NestingSpeciesService = TestBed.get(NestingSpeciesService);
    expect(service).toBeTruthy();
  });
});
