import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from '../../types/desktopItems';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
})
export class AddElementComponent implements OnInit {
  icon: IconProp = 'folder';
  name: string = '';
  linkName: string = '';
  elements: [] = [];

  iconTypes: IconProp[] = ['folder', 'file'];

  constructor(
    private service: DesktopItemsService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit(e: any) {
    // e.preventDefault();
    if(!this.name) return

    this.linkName = this.name.replace(/\s/g, '').toLowerCase();

    const newElement: DesktopItem = {
      icon: this.icon,
      name: this.name,
      linkName: this.linkName,
      elements: this.elements,
    };
    this.service
      .addDesktopItem(newElement)
      .subscribe(() => this.location.back());
  }
}
