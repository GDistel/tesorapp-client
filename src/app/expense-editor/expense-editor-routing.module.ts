import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ExpenseEditorComponent } from './expense-editor.component';

const routes: Routes = [
  { path: '', component: ExpenseEditorComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseEditorRoutingModule { }
