import { TestBed } from '@angular/core/testing';

import { DesktopItemsService } from './desktop-items.service';

describe('DesktopItemsService', () => {
  let service: DesktopItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesktopItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
