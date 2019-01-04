import { TestBed } from '@angular/core/testing';

import { NestReportsService } from './nest-reports.service';

describe('NestReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NestReportsService = TestBed.get(NestReportsService);
    expect(service).toBeTruthy();
  });
});
