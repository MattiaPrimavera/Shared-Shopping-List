import { Injectable } from '@angular/core';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { Observable } from 'rxjs';
import { DbService } from '../database/db.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  collectionName = 'items';
  constructor(private dbService: DbService) {}

  list(): Observable<ShoppingItem[]> {
    return this.dbService.getItems();
  }

  async add(item: ShoppingItem) {
    return this.dbService.addItem(item);
  }

  async delete(key: string) {
    return this.dbService.deleteItem(key);
  }

  async update(key: string, item: ShoppingItem) {
    return this.dbService.updateItem(key, item);
  }
}
