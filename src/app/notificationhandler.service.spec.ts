import { TestBed } from '@angular/core/testing';

import { NotificationhandlerService } from './notificationhandler.service';

describe('NotificationhandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationhandlerService = TestBed.get(NotificationhandlerService);
    expect(service).toBeTruthy();
  });
});
