import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { DesktopMenuComponent } from './components/desktop-menu/desktop-menu.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { DesktopItemsDirective } from './directives/desktop-items.directive';
import { HttpClientModule } from '@angular/common/http';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { ActionsComponent } from './components/actions/actions.component';
import { faDumpster, faDesktop, faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import { AddElementComponent } from './components/add-element/add-element.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskbarComponent,
    DesktopMenuComponent,
    DesktopItemsComponent,
    DesktopItemsDirective,
    AppIconComponent,
    ActionsComponent,
    AddElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDumpster, faDesktop, faFolder, faFile);
  }
}
