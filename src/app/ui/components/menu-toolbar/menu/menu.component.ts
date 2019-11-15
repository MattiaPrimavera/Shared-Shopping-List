import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuAction } from '../actions/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() menuClicked = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  inviteUser() {
    console.log('[menu] inviteUser')
    this.menuClicked.emit(MenuAction.inviteUser)
  }

  joinShoppingList() {
    console.log('[menu] joinShoppingList')
    this.menuClicked.emit(MenuAction.joinShoppingList)
  }

  signOut() {
    console.log('[menu] signOut')
    this.menuClicked.emit(MenuAction.signOut)
  }
}
