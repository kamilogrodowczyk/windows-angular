import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { AddElementComponent } from './components/add-element/add-element.component';
import { DisplaySettingsComponent } from './components/display-settings/display-settings.component';
import { NotepadComponent } from './components/notepad/notepad.component';

export const routes: Routes = [
  { path: '', component: DesktopItemsComponent },
  {
    path: 'desktop/newfolder',
    component: AddElementComponent,
  },
  {
    path: 'desktop/display',
    component: DisplaySettingsComponent,
  },
  {
    path: ':appIcon',
    component: AppIconComponent,
  },
  {
    path: ':appIcon/:action',
    component: ActionsComponent,
  },
  {
    path: ':appIcon/notepad/:document',
    component: NotepadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
