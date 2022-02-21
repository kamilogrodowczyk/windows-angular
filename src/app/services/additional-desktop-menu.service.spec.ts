import { TestBed } from '@angular/core/testing';

import { AdditionalDesktopMenuService } from './additional-desktop-menu.service';

describe('AdditionalDesktopMenuService', () => {
  let service: AdditionalDesktopMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalDesktopMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
