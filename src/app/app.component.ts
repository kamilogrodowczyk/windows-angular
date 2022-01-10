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
  expandedFlag: boolean = false;
  iconRoute: string = '';

  ngOnInit(): void {}

  constructor(public desktopMenuService: DesktopMenuService) {}

  addMenuOnBody(e: any) {
    if (e.target.nodeName !== 'A') {
      this.desktopMenuService.getItems(3);
    }
  }

  getRoute(route: string) {
    this.iconRoute = route;
  }
}
