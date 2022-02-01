import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DesktopMenuComponent } from '../components/desktop-menu/desktop-menu.component';
import { DesktopMenuService } from './desktop-menu.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayDesktopMenuService {
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay, private menuService: DesktopMenuService) { }

  setPosition(e: MouseEvent) {
    const menuLength = this.menuService.menuItems.length;
    const minWidth = 200;
    const minHeight = 45 * menuLength;
    const screenWidth = window.screen.width - minWidth;
    const screenHeight = window.innerHeight - minHeight;
    let left, top;

    [left, top] = [`${e.clientX}px`, `${e.clientY}px`];

    if (screenWidth < e.clientX) {
      left = `${e.clientX - minWidth}px`;
    }

    if (screenHeight < e.clientY) {
      top = `${e.clientY - minHeight}px`;
    }
    return [left, top];
  }

  open(event: MouseEvent) {
    const pos = this.setPosition(event)
    const config = new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .global()
        .left(`${pos[0]}`)
        .top(`${pos[1]}`),
    });
    this.overlayRef = this.overlay.create(config);
    const portal = new ComponentPortal(DesktopMenuComponent);
    this.overlayRef.attach(portal);
  }

  hideTask() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  showTask(event: any) {
    event.preventDefault();
    if (event.target.nodeName !== 'A') {
      this.menuService.getItems(3);
    }
    if(this.overlayRef) {
      this.overlayRef.detach();
    }
    this.open(event);
  }
}
