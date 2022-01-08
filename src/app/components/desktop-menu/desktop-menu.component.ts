import { Component, OnInit, Input } from '@angular/core';
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

  constructor(public service: DesktopMenuService) {}

  setFn(e: any) {
    switch (e.target.innerText) {
      case 'Refresh':
        this.service.refresh();
        break;
      default:
        return;
    }
  }

  ngOnInit(): void {  }
}
