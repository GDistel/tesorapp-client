import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExpensesListRoutingModule } from './expenses-list-routing.module';
import { ExpensesListComponent } from './expenses-list.component';


@NgModule({
  declarations: [
    ExpensesListComponent
  ],
  imports: [
    SharedModule,
    ExpensesListRoutingModule
  ]
})
export class ExpensesListModule { }
