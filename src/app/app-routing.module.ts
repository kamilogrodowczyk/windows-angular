import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { DisplaySettingsComponent } from './components/display-settings/display-settings.component';
import { NotepadComponent } from './components/notepad/notepad.component';
import { ThispcComponent } from './components/thispc/thispc.component';

export const routes: Routes = [
  { path: '', component: DesktopItemsComponent },
  {
    path: 'desktop/display',
    component: DisplaySettingsComponent,
  },
  {
    path: 'thispc',
    component: ThispcComponent,
  },
  {
    path: ':appIcon',
    component: AppIconComponent,
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
