import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ExpensesListComponent } from './expenses-list.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExpensesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/expense',
    loadChildren: () => import('../expense-editor/expense-editor.module').then(m => m.ExpenseEditorModule)
  },
  {
    path: ':id/details',
    loadChildren: () => import('../expenses-list-details/expenses-list-details.module')
      .then(m => m.ExpensesListDetailsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesListRoutingModule { }
