import { TestBed } from '@angular/core/testing';

import { TestDesktopItemsService } from './test-desktop-items.service';

describe('TestDesktopItemsService', () => {
  let service: TestDesktopItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDesktopItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
