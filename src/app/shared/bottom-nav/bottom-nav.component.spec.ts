import { SharedModule } from './../shared.module';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BottomNavAction } from './../interfaces';
import { BottomNavComponent } from './bottom-nav.component';

function getIconText(el: HTMLElement): string {
  return el.querySelector('mat-icon')?.textContent!;
}

describe('BottomNavComponent', () => {
  let component: BottomNavComponent;
  let fixture: ComponentFixture<BottomNavComponent>;
  let debugElem: DebugElement;
  let btns: DebugElement[];
  const actions: BottomNavAction[] = [
    { id: 1, icon: 'visibility', activeIcon: 'clear' },
    { id: 2, icon:'edit' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomNavComponent ],
      imports: [ SharedModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavComponent);
    debugElem = fixture.debugElement;
    component = fixture.componentInstance;
    component.actions = actions;
    fixture.detectChanges();
    btns = debugElem.queryAll(By.css('.actions > button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the provided action buttons in the component template', () => {
    expect(btns.length).toBe(2, 'Unexpected number of action buttons');
    const firstBtn = btns[0].nativeElement;
    expect(getIconText(firstBtn)).toEqual(actions[0].icon, 'Unexpected icon');
  });

  it('should change the active icon when the corresponding button is clicked', () => {
    const firstBtn = btns[0].nativeElement;
    expect(component.activeAction).toBe(-1);
    firstBtn.click();
    expect(component.activeAction).toBe(1);
  });

  it('should emit the active icon when the corresponding button is clicked', () => {
    const firstBtn = btns[0].nativeElement;
    component.actionClicked.subscribe(action => expect(action).toBe(1));
    firstBtn.click();
  });

  it('should change the icon in the template when an active icon is provided', () => {
    const firstBtn = btns[0].nativeElement;
    firstBtn.click();
    fixture.detectChanges();
    expect(getIconText(firstBtn)).toEqual(actions[0].activeIcon!, 'Unexpected icon');
  });

  it('should NOT change the icon in the template when an active icon is not provided', () => {
    const secondBtn = btns[1].nativeElement;
    secondBtn.click();
    expect(component.activeAction).toBe(2);
    fixture.detectChanges();
    expect(getIconText(secondBtn)).toEqual(actions[1].icon, 'Unexpected icon');
  });

});
