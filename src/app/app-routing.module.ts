import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'expenses-lists',
    loadChildren: () => import('./expenses-lists/expenses-lists.module').then(m => m.ExpensesListsModule)
  },
  {
    path: 'expenses-list',
    loadChildren: () => import('./expenses-list/expenses-list.module').then(m => m.ExpensesListModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'expenses-lists'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
