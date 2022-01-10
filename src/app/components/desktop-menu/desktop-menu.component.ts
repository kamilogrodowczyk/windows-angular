import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { desktopMenu } from 'src/app/mocks/desktopMenu';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopMenu } from 'src/app/types/desktopMenu';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Input() left: string = '';
  @Input() top: string = '';
  @Input() iconName: string = '';
  menuItems: DesktopMenu[] = desktopMenu;

  constructor(public service: DesktopMenuService, private router: Router) {}

  setFn(item: string) {
    switch (item) {
      case 'Refresh':
        this.service.refresh();
        break;
      case 'Open':
        this.router.navigate([this.service.changeName(this.iconName)]);
        break;
      case 'Change name':
        const actionRoute = this.menuItems[0].name.indexOf(item)
        this.router.navigate([this.service.changeName(this.iconName), desktopMenu[0]['linkName'][actionRoute]]);
        break;
      default:
        return;
    }
  }

  ngOnInit(): void {}
}
