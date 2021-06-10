import { NgModule } from '@angular/core';

import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddExpenseComponent
  ],
  imports: [
    SharedModule,
    AddExpenseRoutingModule
  ]
})
export class AddExpenseModule { }
