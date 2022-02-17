import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DesktopItemsService } from 'src/app/services/desktop-items.service';
import { DesktopItem } from '../../types/desktopItems';
import { newItem } from './newItem';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
})
export class AddElementComponent implements OnInit {
  iconTypes: IconProp[] = ['folder', 'file'];
  newItem = new newItem(this.iconTypes[0], '', '', []);
  form!: FormGroup;

  constructor(
    private service: DesktopItemsService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit(e: any) {
    e.preventDefault();
    if (!this.newItem.name.trim()) return;

    this.newItem.linkName = this.newItem.name.replace(/\s/g, '').toLowerCase();

    const newElement: DesktopItem = {
      icon: this.newItem.icon,
      name: this.newItem.name.trim(),
      linkName: this.newItem.linkName,
      elements: this.newItem.elements,
    };
    this.service
      .addDesktopItem(newElement)
      .subscribe(() => this.location.back());
  }
}
