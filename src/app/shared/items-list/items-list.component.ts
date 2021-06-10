import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {
  @Input() items!: any[];
  @Input() actionIcon = 'delete';
  @Input() actionColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() toggleAction = false;
  @Output() itemClicked = new EventEmitter<any>();
  @Output() itemActionClicked = new EventEmitter<any>();

  constructor() { }

  onListItemClicked(listItem: any): void {
    this.itemClicked.emit(listItem);
  }

  onItemAction(item: any, event: MouseEvent): void {
    event.stopPropagation();
    this.itemActionClicked.emit(item);
  }

}
