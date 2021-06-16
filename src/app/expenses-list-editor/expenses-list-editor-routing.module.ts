import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListEditorComponent } from './expenses-list-editor.component';

const routes: Routes = [
  { path: '', component: ExpensesListEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesListEditorRoutingModule { }
