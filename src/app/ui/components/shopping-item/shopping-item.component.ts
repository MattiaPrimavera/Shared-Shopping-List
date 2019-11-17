import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),

      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '50px' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
         style({
           transform: 'scale(0.5)', opacity: 0,
           height: '0px', margin: '0px'
         }))
      ])
    ])
  ],
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.scss']
})
export class ShoppingItemComponent implements OnInit {
  @Input() item: any;
  @Output() itemClicked = new EventEmitter();
  @Output() doneClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.itemClicked.emit(this.item);
  }

  onDoneClicked() {
    setTimeout(() => this.doneClicked.emit(this.item), 500);
  }
}
