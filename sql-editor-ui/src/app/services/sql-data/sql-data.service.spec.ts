import { TestBed } from '@angular/core/testing';

import { SqlDataService } from './sql-data.service';

describe('SqlDataService', () => {
  let service: SqlDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
