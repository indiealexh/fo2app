import { TestBed } from '@angular/core/testing';

import { MobDataService } from './mob-data.service';

describe('MobDataService', () => {
  let service: MobDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
