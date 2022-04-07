import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem, DesktopItemElement } from 'src/app/types/desktopItems';
import { WindowsSettings } from 'src/app/types/windowsSettings';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {
  @Input() app!: DesktopItem | WindowsSettings | DesktopItemElement;
  @Input() isSavedText: string = '';
  @Input() additionalName: string = '';
  @Input() backButton: boolean = false;
  arrowLeft = faArrowLeft;

  constructor(
    private router: Router,
    private location: Location,
    private menuService: DesktopMenuService
  ) {}

  ngOnInit(): void {}

  minimalize() {
    this.router.navigate(['/']);
  }

  close() {
    this.router.navigate(['/']);
    this.menuService.removeSelectedApp(this.app);
  }

  back() {
    this.location.back();
  }
}
