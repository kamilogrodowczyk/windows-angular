import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopMenuService } from 'src/app/services/desktop-menu.service';
import { OverlayDesktopMenuService } from 'src/app/services/overlay-desktop-menu.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
})
export class DesktopMenuComponent implements OnInit {
  test: any;

  ngOnInit(): void {}

  constructor(
    public service: DesktopMenuService,
    private router: Router,
    private overlayMenu: OverlayDesktopMenuService
  ) {
    this.service.newTextDocument$.subscribe((item) => (this.test = item));
  }

  setFn(item: string) {
    const linkName = this.overlayMenu.hideMenu();
    switch (item) {
      case 'Refresh':
        window.location.reload();
        break;
      case 'Open':
        const linkNameDocument = linkName.document
          ? ['notepad', linkName.document]
          : '';
        this.router.navigate([linkName.file, ...linkNameDocument]);
        break;
      case 'Change name':
        // this.router.navigate([linkName.file, 'changename']);
        this.service.updateDocumentFlag(true);
        break;
      case 'New folder':
        // this.router.navigate(['desktop', 'newfolder']);
        this.service.createNewDocumentFlag(true);
        break;
      case 'Remove':
        this.service.onRemoveClick(linkName.file).subscribe();
        break;
      case 'Empty Recycle Bin':
        this.service.clearRecycleBin();
        break;
      case 'Copy':
        this.service.copy(linkName.file);
        break;
      case 'Paste':
        this.service.paste()?.subscribe();
        break;
      case 'Display settings':
        this.router.navigate(['desktop', 'display']);
        break;
      case 'New text document':
        this.service.createNewDocumentFlag(true);
        break;
      default:
        return;
    }
  }
}
