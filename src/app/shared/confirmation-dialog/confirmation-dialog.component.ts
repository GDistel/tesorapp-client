import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogData } from './interfaces';

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) { }

  close(): void {
    this.dialogRef.close(false)
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
