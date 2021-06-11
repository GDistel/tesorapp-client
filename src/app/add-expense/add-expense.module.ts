import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddExpenseRoutingModule } from './add-expense-routing.module';
import { AddExpenseComponent } from './add-expense.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddExpenseComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AddExpenseRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ]
})
export class AddExpenseModule { }
