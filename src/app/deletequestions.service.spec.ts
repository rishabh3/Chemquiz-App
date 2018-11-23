import { TestBed } from '@angular/core/testing';

import { DeletequestionsService } from './deletequestions.service';

describe('DeletequestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletequestionsService = TestBed.get(DeletequestionsService);
    expect(service).toBeTruthy();
  });
});
