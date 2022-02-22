import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { sortByMenu, viewMenu } from 'src/app/mocks/desktopMenu';
import { AdditionalDesktopMenuService } from 'src/app/services/additional-desktop-menu.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';
import { DesktopItem } from 'src/app/types/desktopItems';
import { DesktopSavedOptions } from 'src/app/types/desktopMenu';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  isView: boolean = false;
  isSortBy: boolean = false;
  iconsSize: string[] = [];
  iconsSortBy: string[] = [];
  currentOption: string = '';
  sizeOption: string = localStorage.getItem('options') || '';

  ngOnInit(): void {}

  constructor(
    public service: DesktopMenuService,
    private router: Router,
    private overlayMenu: OverlayDesktopMenuService,
    private additionalDesktopMenu: AdditionalDesktopMenuService
  ) {}

  setViewState(item: string) {
    this.sizeOption = localStorage.getItem('options') || '';
    item === 'View' ? (this.isView = true) : (this.isView = false);
    this.iconsSize = viewMenu;
    this.currentOption = this.additionalDesktopMenu.currentOption;
    this.additionalDesktopMenu.setViewState(this.iconsSize, this.sizeOption);
  }
  setSortByState(item: string) {
    item === 'Sort by' ? (this.isSortBy = true) : (this.isSortBy = false);
    this.iconsSortBy = sortByMenu;
  }

  setIconSize(option: string) {
    this.additionalDesktopMenu.setIconSize(option);
    this.currentOption = option;
    console.log(option)
  }

  setIconSort(option: string) {
    this.additionalDesktopMenu.setIconSort(option);
    this.service.sort();
  }

  setFn(item: string) {
    const iconName = this.overlayMenu.hideMenu();
    switch (item) {
      case 'Refresh':
        window.location.reload();
        break;
      case 'Open':
        this.router.navigate([iconName]);
        break;
      case 'Change name':
        this.router.navigate([iconName, 'changename']);
        break;
      case 'New folder':
        this.router.navigate(['desktop', 'newfolder']);
        break;
      case 'Remove':
        this.service.onRemoveClick(iconName).subscribe();
        break;
      case 'Empty Recycle Bin':
        this.service.clearRecycleBin();
        break;
      case 'Copy':
        this.service.copy(iconName);
        break;
      case 'Paste':
        this.service.paste()?.subscribe();
        break;
      default:
        return;
    }
  }
}
