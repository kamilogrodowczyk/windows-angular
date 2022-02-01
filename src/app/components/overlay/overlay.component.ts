import { Overlay } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements AfterViewInit {
  // @ViewChild(CdkPortal)
  
  isOpen: boolean = false;
  constructor(private overlay: Overlay) {}

  public ngAfterViewInit() {
    this.createOverlay();
  }

  private createOverlay() {
    // console.log(this.overlay.create())
  }

}
