import {} from 'jasmine';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { DesktopItemsService } from './desktop-items.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
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
      const msg = 'Error 404';
      service.getItems().subscribe({
        next: (items) => fail('expected to fail'),
        error: (e) => expect(e.message).toContain(msg),
      });

      const req = httpTestingController.expectOne(service.iconsUrl);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('updateItem', () => {
    const putUrl = (id: number) => `${service.iconsUrl}/${id}`;
    const updatedItem: DesktopItem = {
      id: 1,
      icon: 'folder',
      name: 'Test-folder',
      linkName: 'test-folder',
      elements: [],
    };

    it('should update desktop item and return it', () => {
      service.updateItem(updatedItem).subscribe({
        next: (item) =>
          expect(item)
            .withContext('should return updated item')
            .toEqual(updatedItem),
        error: fail,
      });

      // HeroService should have made one request to PUT hero
      const req = httpTestingController.expectOne(putUrl(1));
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedItem);

      // Expect server to return the hero after PUT
      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: updatedItem,
      });
      req.event(expectedResponse);
    });

    it('should return 404 error', () => {
      const msg = 'Error 404';
      service.updateItem(updatedItem).subscribe({
        next: (item) => fail('expected to fail'),
        error: (e) => expect(e.message).toContain(msg),
      });

      const req = httpTestingController.expectOne(putUrl(1));
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('addDesktopItem', () => {
    const addedItem: DesktopItem = {
      id: 1,
      icon: 'folder',
      name: 'Test-folder',
      linkName: 'test-folder',
      elements: [],
    };

    it('should add new item and return it', () => {
      service.addDesktopItem(addedItem).subscribe({
        next: (item) =>
          expect(item).withContext('should return new item').toEqual(addedItem),
        error: fail,
      });

      const req = httpTestingController.expectOne(service.iconsUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addedItem);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: addedItem,
      });

      req.event(expectedResponse);
    });

    it('should return error 404', () => {
      const msg = 'Error 404';
      service.addDesktopItem(addedItem).subscribe({
        next: (item) => fail('expected to fail'),
        error: (e) => expect(e.message).toContain(msg),
      });

      const req = httpTestingController.expectOne(service.iconsUrl);
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('deleteItem', () => {
    const putUrl = (id: number) => `${service.iconsUrl}/${id}`;
    const removedItem: DesktopItem = {
      id: 1,
      icon: 'folder',
      name: 'Test-folder',
      linkName: 'test-folder',
      elements: [],
    };

    it('should delete item and return it', () => {
      service.deleteItem(removedItem.id).subscribe({
        next: (item) =>
          expect(item)
            .withContext('should return removed item')
            .toEqual(removedItem),
        error: fail,
      });

      const req = httpTestingController.expectOne(putUrl(1));
      expect(req.request.method).toEqual('DELETE');

      req.flush(removedItem);
    });
  });

  describe('getItem', () => {
    const putUrl = (linkName: string) =>
      `${service.iconsUrl}/?linkName=${linkName}`;
    const expectedItems: DesktopItem[] = [
      {
        id: 1,
        icon: 'folder',
        name: 'Test-folder',
        linkName: 'test-folder',
        elements: [],
      },
    ];

    it('should return one item', () => {
      const linkName = 'test-folder';
      service.getItem(linkName).subscribe({
        next: (item) =>
          expect(item)
            .withContext('should return exactly one item')
            .toEqual(expectedItems[0]),
        error: fail,
      });

      const req = httpTestingController.expectOne(putUrl(linkName));
      expect(req.request.method).toEqual('GET');

      req.flush(expectedItems);
    });
  });
});
