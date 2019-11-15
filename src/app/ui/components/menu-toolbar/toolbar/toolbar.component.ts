import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToolbarAction } from '../actions/toolbar';

@Component({
  selector: 'app-menu-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class MenuToolbarComponent implements OnInit {
  @Output() toolbarAction = new EventEmitter();
  @Output() menuAction = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  openMyShoppingList() {
    console.log('[menu-toolbar] openMyShoppingList')
    this.toolbarAction.emit(ToolbarAction.openMyShoppingList)
  }

  deleteAll() {
    console.log('[menu-toolbar] deleteAll')
    this.toolbarAction.emit(ToolbarAction.deleteAll)
  }

  menuClicked($event) {
    console.log('[menu-toolbar] menuClicked')
    this.menuAction.emit($event)
  }
}
