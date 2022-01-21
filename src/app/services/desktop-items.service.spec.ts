import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { DesktopItemsService } from './desktop-items.service';
import { HttpClient } from '@angular/common/http';
import { DesktopItem } from '../types/desktopItems';

describe('DesktopItemsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: DesktopItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DesktopItemsService],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DesktopItemsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getItems', () => {
    let expectedItems: DesktopItem[];

    beforeEach(() => {
      service = TestBed.inject(DesktopItemsService);
      expectedItems = [
        {
          id: 1,
          icon: 'folder',
          name: 'Test-folder',
          linkName: 'test-folder',
          elements: [],
        },
        {
          id: 2,
          icon: 'folder',
          name: 'Test-folder2',
          linkName: 'test-folder2',
          elements: [],
        },
      ] as DesktopItem[];
    });

    it('should return expected desktop items', () => {
      service.getItems().subscribe({
        next: (items) =>
          expect(items)
            .withContext('should return expected items')
            .toEqual(expectedItems),
        error: fail,
      });

      // HeroService should have made one request to GET heroes from expected URL
      const req = httpTestingController.expectOne(service.iconsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock heroes
      req.flush(expectedItems);
    });

    it('should be OK to return no items', () => {
      service.getItems().subscribe({
        next: (items) =>
          expect(items.length).withContext('should return no items').toEqual(0),
        error: fail,
      });

      const req = httpTestingController.expectOne(service.iconsUrl);

      // Respond with no heroes
      req.flush([]);
    });

    it('should return 404 error', () => {
      const msg = 'Deliberate 404';
      service.getItems().subscribe({
        next: (items) => fail('expected to fail'),
        error: (e) => expect(e.message).toContain(msg),
      });

      const req = httpTestingController.expectOne(service.iconsUrl);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });
});
