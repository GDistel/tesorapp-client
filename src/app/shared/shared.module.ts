import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    BottomNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ItemsListComponent,
    BottomNavComponent
  ]
})
export class SharedModule { }
