import { Injectable } from '@angular/core';
import { ShoppingItem } from 'src/models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {
  updateItem: ShoppingItem;

  constructor() {}

  getUpdateItem() {
    return this.updateItem;
  }

  setUpdateItem(updateItem: ShoppingItem) {
    this.updateItem = updateItem;
  }
}
