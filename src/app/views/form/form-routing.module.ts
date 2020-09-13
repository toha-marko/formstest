import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectAccessGuard } from '@misc/direct-access.guard';

import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'preview',
    loadChildren: () => import('./preview/preview.module').then(m => m.PreviewModule),
    canActivate: [DirectAccessGuard],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/form'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
