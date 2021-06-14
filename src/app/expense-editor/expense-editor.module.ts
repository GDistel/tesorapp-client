import { ExpenseEditorComponent } from './expense-editor.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpenseEditorRoutingModule } from './expense-editor-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExpenseEditorComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ExpenseEditorRoutingModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ]
})
export class ExpenseEditorModule { }
