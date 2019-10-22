import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Output() itemClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick() {
    const shoppingItem = {
      title: this.title,
      description: this.description
    };

    this.itemClicked.emit(shoppingItem);
  }
}
