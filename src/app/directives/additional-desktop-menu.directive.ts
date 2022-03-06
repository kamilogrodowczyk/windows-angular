import { Directive, HostListener, Input } from '@angular/core';
import { sortByMenu, viewMenu } from '../mocks/desktopMenu';
import { AdditionalDesktopMenuService } from './additional-desktop-menu.service';
import { DesktopMenuService } from '../services/desktop-menu.service';
import { BrowserStorageService } from '../services/storage.service';

@Directive({
  selector: '[appViewSize]',
  exportAs: 'test',
})
export class AdditionalDesktopMenuDirective {
  @Input('appViewSize') item = '';
  currentItems: string[] = [];
  selectedOption: string = '';
  setFn: any;

  constructor(
    private storage: BrowserStorageService,
    private service: AdditionalDesktopMenuService,
    private menuService: DesktopMenuService
  ) {}

  setViewState(items: string[], storageOption: string, option: string) {
    this.currentItems = items;
    if (!storageOption) return;
    const storage = JSON.parse(storageOption);
    const currentSize = this.currentItems.filter((size) =>
      size.toLowerCase().includes(storage[option])
    );
    this.selectedOption = currentSize[0];
  }

  @HostListener('mousemove')
  setOption() {
    const optionsJson = this.storage.get('options') || '{}';
    this.currentItems = [];
    switch (this.item) {
      case 'View':
        this.setViewState(viewMenu, optionsJson, 'size');
        this.setFn = this.setSize;
        break;
      case 'Sort by':
        this.setViewState(sortByMenu, optionsJson, 'sortBy');
        this.setFn = this.setSort;
        break;

      default:
        break;
    }
  }

  @HostListener('mouseleave')
  clearOptions() {
    this.currentItems = [];
  }

  setSize(option: string) {
    this.service.setIconSize(option);
  }
  setSort(option: string) {
    if(option === 'Creation date') {
      option = 'id';
    }
    this.menuService.sort(option.toLowerCase());
  }
}
