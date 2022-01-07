import { Component } from '@angular/core';
import { DesktopMenuService } from './services/desktop-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'windows-project';

  left: string = '';
  top: string = '';
  iconName: string = '';
  length: number = 0;


  ngOnInit(): void {}

  constructor(public desktopMenuService: DesktopMenuService) {}

  getMenu(index: number) {
    this.desktopMenuService.getItems(index);
  }

  addMenuOnBody(e: any) {
    if (
      e.target.nodeName === 'APP-DESKTOP-ITEMS' ||
      e.target.nodeName === 'DIV'
    ) {
      this.desktopMenuService.getItems(3);
    }
    this.iconName = e.target.name;
  }
}
