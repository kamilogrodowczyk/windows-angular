import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
import { desktopMenu } from 'src/app/mocks/desktopMenu';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
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
  toRemove?: DesktopItem;
  allIcons: DesktopItem[] = []

  ngOnInit(): void {
    this.getItems()
    this.desktopItemService
      .getItem('recyclebin')
      .subscribe((item) => (this.toRemove = item[0]));
    
  }

  constructor(
    public service: DesktopMenuService,
    private desktopItemService: DesktopItemsService,
    private router: Router
  ) {}

  ex(el: any) {
    return this.toRemove?.elements.push(el);
  }

  getItems() {
    this.desktopItemService
      .getItems()
      .subscribe((items) => (this.allIcons = items));
  }

  setFn(item: string) {
    const routeName = this.service.changeName(this.iconName);
    switch (item) {
      case 'Refresh':
        this.service.refresh();
        break;
      case 'Open':
        this.router.navigate([routeName]);
        break;
      case 'Change name':
        this.router.navigate([
          this.service.changeName(this.iconName),
          'changename',
        ]);
        break;
      case 'New folder':
        this.router.navigate(['desktop', 'newfolder']);
        break;
      case 'Remove':
        this.allIcons = this.allIcons.filter(el => el.linkName !== routeName)
        this.desktopItemService
          .getItem(routeName)
          .pipe(
            mergeMap(async (item) => this.toRemove?.elements.push(item[0])),
            mergeMap(() =>
              this.toRemove
                ? this.desktopItemService.updateItem(this.toRemove)
                : []
            )
          )
          .subscribe();
        // this.desktopItemService.deleteItem(remove[0])
        break;
      default:
        return;
    }
  }
}
