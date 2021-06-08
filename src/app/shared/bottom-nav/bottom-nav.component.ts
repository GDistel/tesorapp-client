import { BottomNavAction } from './../interfaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent {
  @Input() actions!: BottomNavAction[];
  @Output() actionClicked = new EventEmitter<number>();

  constructor() { }

  onActionClicked(id: number): void {
    this.actionClicked.emit(id);
  }

}
