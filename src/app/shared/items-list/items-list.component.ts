import {
  Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, NgZone, OnChanges, SimpleChanges
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements AfterViewInit {
  @Input() items!: any[];
  @Input() actionIcon = 'delete';
  @Input() actionColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() toggleAction = false;
  @Output() itemClicked = new EventEmitter<any>();
  @Output() itemActionClicked = new EventEmitter<any>();
  @Output() fetchMoreItems = new EventEmitter<void>();

  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  loading = false;

  constructor(private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe({
      next: () => this.fetchMore()
    });
  }

  fetchMore(): void {
    this.ngZone.run(() => {
      this.loading = true;
      this.fetchMoreItems.next();
      setTimeout(() => this.loading = false);
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

}
