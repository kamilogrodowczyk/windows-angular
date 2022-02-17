import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import {MatNativeDateModule} from '@angular/material/core';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UniqueDesktopItemNameValidatorDirective } from './form-validator/unique-desktop-items-validator.directive';
import { ForbiddenDesktopItemsValidatorDirective } from './form-validator/forbidden-desktop-items-validator.directive';

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
    UniqueDesktopItemNameValidatorDirective,
    ForbiddenDesktopItemsValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDumpster, faDesktop, faFolder, faFile);
  }
}
