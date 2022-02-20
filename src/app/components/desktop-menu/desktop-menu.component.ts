import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';
import { DesktopItem } from 'src/app/types/desktopItems';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  isView: boolean = false;
  isSortBy: boolean = false;

  ngOnInit(): void {}

  constructor(
    public service: DesktopMenuService,
    private router: Router,
    private overlayMenu: OverlayDesktopMenuService
  ) {}

  setViewState(item: string) {
    item === 'View' ? this.isView = true : this.isView = false;
  }
  setSortByState(item: string) {
    item === 'Sort by' ? this.isSortBy = true : this.isSortBy = false;
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
