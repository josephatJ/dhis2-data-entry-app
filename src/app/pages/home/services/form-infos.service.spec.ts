import { TestBed } from '@angular/core/testing';

import { FormInfosService } from './form-infos.service';

describe('FormInfosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormInfosService = TestBed.get(FormInfosService);
    expect(service).toBeTruthy();
  });
});
