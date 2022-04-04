import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';
import { NotepadComponent } from './components/notepad/notepad.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SystemComponent } from './components/settings/system/system.component';
import { ThispcComponent } from './components/thispc/thispc.component';

export const routes: Routes = [
  { path: '', component: DesktopItemsComponent },
  {
    path: 'settings/:setting',
    component: SystemComponent,
  },
  {
    path: 'thispc',
    component: ThispcComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
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
