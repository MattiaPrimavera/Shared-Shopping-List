import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingItem } from 'src/models/shopping-item';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  collectionName = 'items';
  constructor(private db: AngularFireDatabase, private dbService: DbService) {}

  list(): Observable<ShoppingItem[]> {
    return this.db.list<ShoppingItem>(this.collectionName).valueChanges();
  }

  add(item: ShoppingItem) {
    return this.dbService.addItem(item);
  }

  delete(key: string) {
    return this.dbService.deleteItem(key);
  }

  update(key: string, item: ShoppingItem) {
    return this.dbService.updateItem(key, item);
  }
}
