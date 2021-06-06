import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  @Input() items!: any[];
  @Output() itemClicked = new EventEmitter<any>();
  @Output() addBtnClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onListItemClicked(listItem: any): void {
    this.itemClicked.emit(listItem);
  }

  onAddBtnClicked(): void {
    this.addBtnClicked.emit();
  }

}
