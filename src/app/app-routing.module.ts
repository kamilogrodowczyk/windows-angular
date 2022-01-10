import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from './components/actions/actions.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';
import { DesktopItemsComponent } from './components/desktop-items/desktop-items.component';

const routes: Routes = [
  { path: '', component: DesktopItemsComponent },
  {
    path: ':appIcon',
    component: AppIconComponent,
  },
  {
    path: ':appIcon/:action',
    component: ActionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
