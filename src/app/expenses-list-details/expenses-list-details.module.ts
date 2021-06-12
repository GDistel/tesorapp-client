import { NgModule } from '@angular/core';

import { ExpensesListDetailsRoutingModule } from './expenses-list-details-routing.module';
import { ExpensesListDetailsComponent } from './expenses-list-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExpensesListDetailsComponent
  ],
  imports: [
    SharedModule,
    ExpensesListDetailsRoutingModule
  ]
})
export class ExpensesListDetailsModule { }
