import { TestBed } from '@angular/core/testing';

import { LibData } from './lib-data';

describe('LibData', () => {
  let service: LibData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
