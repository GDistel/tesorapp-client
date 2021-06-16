import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpensesListEditorComponent } from './expenses-list-editor.component';
import { ExpensesListEditorRoutingModule } from './expenses-list-editor-routing.module';


@NgModule({
  declarations: [
    ExpensesListEditorComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ExpensesListEditorRoutingModule
  ]
})
export class ExpensesListEditorModule { }
