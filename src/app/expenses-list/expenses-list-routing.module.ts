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
    path: ':id/add-expense',
    loadChildren: () => import('../add-expense/add-expense.module').then(m => m.AddExpenseModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesListRoutingModule { }
