import { DebugElement, SimpleChange } from '@angular/core';
import { CdkVirtualScrollViewport, ExtendedScrollToOptions, ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';
import { ItemsListComponent } from './items-list.component';
import { IListItem } from '../interfaces';

describe('ItemsListComponent', () => {
  let component: ItemsListComponent;
  let fixture: ComponentFixture<ItemsListComponent>;
  let items: IListItem[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsListComponent ],
      imports: [ ScrollingModule, SharedModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    items = [
      { id: 1, name: 'Sights', description: 'Double decker bus', icon: 'visibility' },
      { id: 2, name: 'Farm visit', description: 'Farme experience', icon: 'work' }
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a spinner until items are loaded', () => {
    const spinnerItem = getSpinnerDebugEl(fixture.debugElement).nativeElement;
    expect(spinnerItem).toBeTruthy();
    component.items = items;
    component.ngOnChanges({items: new SimpleChange([], items, false)});
    fixture.detectChanges();
    expect(getSpinnerDebugEl(fixture.debugElement)).toBeFalsy();
  });

  it('should display a "no items" message if the parent component does not provide items', () => {
    const list = getListDebugEl(fixture.debugElement).nativeElement;
    expect(list).toBeTruthy();
    component.items = []; // parent component delivers no items
    component.canFetchMoreItems = false; // parent component indicates it can't provide more items
    component.ngOnChanges({
      items: new SimpleChange([], [], false),
      canFetchMoreItems: new SimpleChange(true, false, false)
    });
    fixture.detectChanges();
    expect(getListDebugEl(fixture.debugElement)).toBeFalsy();
    expect(getSpinnerDebugEl(fixture.debugElement)).toBeFalsy();
    const noItemsMessage = fixture.debugElement.query(By.css('.no-items')).nativeElement;
    expect(noItemsMessage.textContent).toContain('This list is empty');
    expect(component.scroller.getDataLength()).toBe(0);
  });

  it('should render the items provided by the parent within the virtual scroller', () => {
    component.items = items;
    fixture.detectChanges();
    expect(component.scroller.getDataLength()).toBe(component.items.length);
  });

  // fit('should subscribe to scroll events after view initializes', fakeAsync(() => {
  //   spyOn(component, 'fetchMore');
  //   component.ngAfterViewInit();
  //   component.items = items;
  //   component.loading = false;
  //   fixture.detectChanges();
  //   flush();
  //   component.scroller.scrollToOffset(component.itemSize * 9);
  //   fixture.detectChanges();
  //   console.log(component.scroller.measureScrollOffset())
  //   component.scroller.scrollToOffset(component.itemSize * 10 + 20);
  //   fixture.detectChanges();
  //   tick(300);
  //   expect(component.fetchMore).toHaveBeenCalled();
  // }));

});

function getListDebugEl(rootEl: DebugElement): DebugElement {
  return rootEl.query(By.css('.list'));
}

function getSpinnerDebugEl(rootEl: DebugElement): DebugElement {
  return rootEl.query(By.css('.spinner-item'));
}
