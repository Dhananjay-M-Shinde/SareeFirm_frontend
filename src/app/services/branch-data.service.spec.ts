import { TestBed } from '@angular/core/testing';

import { BranchDataService } from './branch-data.service';

describe('BranchDataService', () => {
  let service: BranchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
