import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { DesktopMenuComponent } from './components/desktop-menu/desktop-menu.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { DesktopItemsDirective } from './directives/desktop-items.directive';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    DesktopMenuComponent,
    DesktopItemsComponent,
    DesktopItemsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
