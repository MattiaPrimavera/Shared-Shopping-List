import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingItem } from 'src/models/shopping-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  itemsRef: AngularFireList<ShoppingItem>;
  items: Observable<ShoppingItem[]>;
  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list<ShoppingItem>('items');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getItems() {
    return this.items;
  }

  addItem(shoppingItem) {
    const { title, description } = shoppingItem;
    this.itemsRef.push({ title, description });
  }

  async updateItem(key: string, item: ShoppingItem) {
    this.itemsRef.update(key, { ...item });
  }

  async deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  async deleteEverything() {
    this.itemsRef.remove();
  }
}
