import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListDetailsComponent } from './expenses-list-details.component';

const routes: Routes = [
  { path: '', component: ExpensesListDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesListDetailsRoutingModule { }
