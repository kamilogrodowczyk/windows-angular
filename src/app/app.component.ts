import { Component } from '@angular/core';
import { DesktopMenuService } from './services/desktop-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'windows-project';

  ngOnInit(): void {}

  constructor(public desktopMenuService: DesktopMenuService) {}
}
