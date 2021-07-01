import { SharedModule } from './../shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { queryAllDebugElem, queryDebugElem } from '../test-utils';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      imports: [ SharedModule ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Confirmation dialog title', body: 'Confirmation dialog body' }
        },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and body passed in the dialog data', () => {
    const dialogTitle = queryDebugElem(fixture.debugElement, '[mat-dialog-title]');
    const dialogBody = queryDebugElem(fixture.debugElement, '[mat-dialog-content]');
    expect(dialogTitle.nativeElement.textContent).toBe('Confirmation dialog title');
    expect(dialogBody.nativeElement.textContent).toContain('Confirmation dialog body');
  });

  it('should close the dialog with "true" if the user confirms', () => {
    const dialogRefSpy = spyOn(component.dialogRef, 'close').and.callThrough();
    const confirmSpy = spyOn(component, 'confirm').and.callThrough();
    const actions = queryAllDebugElem(fixture.debugElement, '[mat-dialog-actions] > button');
    const confirmBtn = actions[1].nativeElement;
    confirmBtn.click();
    fixture.detectChanges();
    expect(confirmSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with "false" if the user cancels', () => {
    const dialogRefSpy = spyOn(component.dialogRef, 'close').and.callThrough();
    const closeSpy = spyOn(component, 'close').and.callThrough();
    const actions = queryAllDebugElem(fixture.debugElement, '[mat-dialog-actions] > button');
    const cancelBtn = actions[0].nativeElement;
    cancelBtn.click();
    fixture.detectChanges();
    expect(closeSpy).toHaveBeenCalled();
    expect(dialogRefSpy).toHaveBeenCalledWith(false);
  });

});
