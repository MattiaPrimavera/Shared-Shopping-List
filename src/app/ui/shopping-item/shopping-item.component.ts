import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {
  @Input() item: any;
  @Output() itemClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.itemClicked.emit(this.item);
  }
}
