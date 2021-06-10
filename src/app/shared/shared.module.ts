import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    ItemsListComponent,
    BottomNavComponent,
    ConfirmationDialogComponent
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
    BottomNavComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule { }
