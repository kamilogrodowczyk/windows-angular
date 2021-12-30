import { Component, Input, OnInit } from '@angular/core';
import { RCMItemsBody } from 'src/app/RightClickMenuItems';

@Component({
  selector: 'app-right-click-menu',
  templateUrl: './right-click-menu.component.html',
  styleUrls: ['./right-click-menu.component.scss'],
})
export class RightClickMenuComponent implements OnInit {
  @Input() items: string[] = RCMItemsBody.name;

  constructor() {}

  ngOnInit(): void {}
}
