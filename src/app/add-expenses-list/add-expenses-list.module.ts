import { NgModule } from '@angular/core';

import { AddExpensesListRoutingModule } from './add-expenses-list-routing.module';
import { AddExpensesListComponent } from './add-expenses-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddExpensesListComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AddExpensesListRoutingModule
  ]
})
export class AddExpensesListModule { }
