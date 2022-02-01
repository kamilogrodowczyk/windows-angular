import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from 'src/material.module';
import {MatNativeDateModule} from '@angular/material/core';

import { AppComponent } from './app.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { DesktopMenuComponent } from './components/desktop-menu/desktop-menu.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { OverlayComponent } from './components/overlay/overlay.component';

import { DesktopItemsDirective } from './directives/desktop-items.directive';


@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    DesktopMenuComponent,
    DesktopItemsComponent,
    DesktopItemsDirective,
    AppIconComponent,
    OverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
