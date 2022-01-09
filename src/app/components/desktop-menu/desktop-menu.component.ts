import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Input() left: string = '';
  @Input() top: string = '';
  @Input() iconName: string = '';
  actionName: string = '';

  constructor(public service: DesktopMenuService, private router: Router) {}

  setFn(e: any) {
    switch (e.target.innerText) {
      case 'Refresh':
        this.service.refresh();
        break;
      case 'Open':
        this.router.navigate([this.service.changeName(this.iconName)]);
        break;
      case 'Change name':
        this.actionName = this.service.changeName(e.target.innerText);
        this.router.navigate([this.service.changeName(this.iconName), this.actionName]);
        break;
      default:
        return;
    }
  }

  ngOnInit(): void {}
}
