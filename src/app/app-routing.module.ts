import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'form', loadChildren: () => import('./views/form/form.module').then(m => m.FormModule)
  },
  {
    path: '**',
    redirectTo: 'form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
