import {
  Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, NgZone, OnChanges, SimpleChanges, SimpleChange, OnDestroy
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, takeUntil, throttleTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items!: any[];
  @Input() actionIcon = 'delete';
  @Input() actionColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() toggleAction = false;
  @Input() canFetchMoreItems = true;
  @Output() itemClicked = new EventEmitter<any>();
  @Output() itemActionClicked = new EventEmitter<any>();
  @Output() fetchMoreItems = new EventEmitter<void>();

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  itemSize = 72;
  loading = true;
  destroy$ = new Subject<void>();

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.subscribeToScrollEvents();
  }

  subscribeToScrollEvents(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200),
      takeUntil(this.destroy$)
    ).subscribe({ next: this.fetchMore });
  }

  ngOnChanges(change: SimpleChanges): void {
    if (change.items?.currentValue?.length || !this.canFetchMoreItems) {
      this.loading = false;
    }
  }

  fetchMore(): void {
    this.ngZone.run(() => {
      if (this.canFetchMoreItems) {
        this.loading = true;
        this.fetchMoreItems.next();
      }
    });
  }

  onListItemClicked(listItem: any): void {
    this.itemClicked.emit(listItem);
  }

  onItemAction(item: any, event: MouseEvent): void {
    if (!this.toggleAction) {
      return;
    }
    event.stopPropagation();
    this.itemActionClicked.emit(item);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
