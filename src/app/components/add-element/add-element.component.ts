import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { DesktopItem, DesktopItemElement } from '../../types/desktopItems';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
})
export class AddElementComponent implements OnInit {
  @Input() initialValueToUpdate: string = '';
  @Input() suffix: string = '';
  appElementLinkName: string = '';
  name: string = '';
  @Input() icon: IconProp = 'file';
  @Input() selectedApp!: DesktopItem;
  @Input() appElement!: DesktopItem;
  @Input() documentElement: DesktopItemElement[] = [];

  isError: any;
  newDocument: boolean = false;
  @Input() updatedDocument: boolean = false;

  @ViewChild('input', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.value = this.name;
      element.nativeElement.focus();
      element.nativeElement.setSelectionRange(
        0,
        element.nativeElement.value.length
      );
    }
  }

  constructor(private desktopMenuService: DesktopMenuService) {
    this.desktopMenuService.textDocumentToCreate$.subscribe(
      (newItem) => (this.newDocument = newItem)
    );

    this.desktopMenuService.textDocumentToUpdate$.subscribe(
      (newItem) => (this.updatedDocument = newItem)
    );
  }

  ngOnInit(): void {
    if (this.updatedDocument) {
      this.name = this.initialValueToUpdate;
    }
  }

  saveSelectedFolder() {
    if (!this.appElement) return;
    this.appElementLinkName = this.appElement.linkName;
    return;
  }

  createNewApp() {
    if (this.appElement !== undefined) return;
    if (!this.newDocument || this.isError) return;
    this.desktopMenuService.createNewApp(this.name).subscribe();
    this.desktopMenuService.createNewDocumentFlag(false);
    this.name = '';
  }

  createNewTextDocument() {
    if (!this.newDocument || this.isError) return;
    this.desktopMenuService
      .createNewTextDocument(this.name, this.appElement, this.documentElement)
      .subscribe();
    this.desktopMenuService.createNewDocumentFlag(false);
    this.name = '';
  }

  updateApp() {
    if (!this.updatedDocument || this.isError) return;
    this.desktopMenuService.updateApp(`${this.name}.txt`, this.selectedApp).subscribe();

    this.desktopMenuService.updateDocumentFlag(false);
    this.name = '';
  }

  changeFlag(e: MouseEvent) {
    if (!this.updatedDocument && !this.newDocument) return;
    if (e.clientX === 0 && e.clientY === 0) return;
    if (this.name.trim() === '' || this.name === this.initialValueToUpdate)
      this.desktopMenuService.createNewDocumentFlag(false);
    this.desktopMenuService.updateDocumentFlag(false);
  }
}
