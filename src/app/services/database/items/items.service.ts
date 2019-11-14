import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { BaseService } from '../base-service/base-service';
import { StoreService } from 'src/app/services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends BaseService<ShoppingItem> {
  constructor(
    db: AngularFireDatabase,
    store: StoreService
  ) {
    super('items', db, store)
  }

  /**
   * Get firebase database references once the user
   * is logged in and its uid is known
   * @param uid Firebase user uid
   */
  setupDatabase(uid: string) {
    console.log(`[items.service] fetching items/${uid}`)
    this.uid = uid;
    this.ref = this.db.list<ShoppingItem>(`items/${uid}`);
  }
}
