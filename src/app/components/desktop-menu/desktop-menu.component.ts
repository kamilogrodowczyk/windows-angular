import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public service: DesktopMenuService,
    private router: Router,
    private overlayMenu: OverlayDesktopMenuService
  ) {}

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
        this.service.onRemoveClick(iconName);
        break;
      case 'Empty Recycle Bin':
        this.service.clearRecycleBin();
        break;
      default:
        return;
    }
  }
}
