import { TestBed } from '@angular/core/testing';

import { DesktopMenuService } from './desktop-menu.service';

describe('DesktopMenuService', () => {
  let service: DesktopMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesktopMenuService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
