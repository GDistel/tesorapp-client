import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent {
  @Input() items!: any[];
  @Output() itemClicked = new EventEmitter<any>();

  constructor() { }

  onListItemClicked(listItem: any): void {
    this.itemClicked.emit(listItem);
  }

}
