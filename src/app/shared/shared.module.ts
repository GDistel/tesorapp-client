import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ItemsListComponent } from './items-list/items-list.component';


@NgModule({
  declarations: [
    ItemsListComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ItemsListComponent
  ]
})
export class SharedModule { }
