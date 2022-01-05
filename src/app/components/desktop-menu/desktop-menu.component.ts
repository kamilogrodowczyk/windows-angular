import { Component, OnInit, Input } from '@angular/core';
import { desktopMenu } from 'src/app/mocks/desktopMenu';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  @Input() left: string = '';
  @Input() top: string = '';

  constructor(public desktopMenuService: DesktopMenuService) {}

  ngOnInit(): void {}

  
}
