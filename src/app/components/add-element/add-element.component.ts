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
  @Input() name: string = 'New folder';
  @Input() icon: IconProp = 'file';
  
  isError: any;
  newDocument: boolean = false;
  updatedDocument: boolean = false;

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
    this.desktopMenuService.newTextDocument$.subscribe(
      (newItem) => (this.newDocument = newItem)
    );

    this.desktopMenuService.updateTextDocument$.subscribe(
      (newItem) => (this.updatedDocument = newItem)
    );
  }

  ngOnInit(): void {}

  createNewDocument() {
    if (!this.newDocument || this.isError) return;
    this.desktopMenuService.createNewDocumentPost(this.name).subscribe();
  }

  createNewDocumentUpdate(
    appElement: DesktopItem,
    documentElement: DesktopItemElement[]
  ) {
    if (!this.newDocument || this.isError) return;
    this.desktopMenuService
      .createNewDocumentUpdate(this.name, appElement, documentElement)
      .subscribe();
  }
}
