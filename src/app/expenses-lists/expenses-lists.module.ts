import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExpensesListsRoutingModule } from './expenses-lists-routing.module';
import { ExpensesListsComponent } from './expenses-lists.component';


@NgModule({
  declarations: [
    ExpensesListsComponent
  ],
  imports: [
    SharedModule,
    ExpensesListsRoutingModule
  ]
})
export class ExpensesListsModule { }
