import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  itemsRef: AngularFireList<ShoppingItem>;
  items: Observable<ShoppingItem[]>;
  constructor(private db: AngularFireDatabase) {
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

  async addItem(shoppingItem: ShoppingItem) {
    const { title, description } = shoppingItem;
    return this.itemsRef.push({ title, description });
  }

  async updateItem(key: string, item: ShoppingItem) {
    return this.itemsRef.update(key, { ...item });
  }

  async deleteItem(key: string) {
    return this.itemsRef.remove(key);
  }

  async deleteEverything() {
    return this.itemsRef.remove();
  }
}
