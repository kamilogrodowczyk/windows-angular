import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RightClickMenuComponent } from './components/right-click-menu/right-click-menu.component';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { RightClickDirective } from './directives/right-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    RightClickMenuComponent,
    TaskbarComponent,
    RightClickDirective
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
