import { IBaseService } from './ibase-service';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { IBaseEntity } from '../ibase-entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store/store.service';
import { ShoppingItem } from 'src/app/models/shopping-item';

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {
  protected ref: AngularFireList<T>;
  protected uid: string;

  constructor(
    protected path: string,
    protected db: AngularFireDatabase,
    protected store: StoreService
  ) {
    const state = this.store.getState();

    if (state) {
      this.uid = state.uid;
      console.log('Base service uid: ', this.uid);
      this.ref = this.db.list<T>(`${path}/${this.uid}`);
    }
  }

  // @TODO implement getter
  get(id: string): Observable<T> {
    return null;
  }

  list(): Observable<T[]> {
     return this.ref
      .snapshotChanges() // Key and value
      .pipe(
        map(changes => {
            return changes.map(c => ({
              key: c.payload.key,
              ...c.payload.val(),
            }));
          })
      );
  }

  add(item: T): firebase.database.ThenableReference {
    return this.ref.push(item);
  }

  update(item: T): Promise<void> {
    return this.ref.update(item.key, item);
  }

  delete(key: string): Promise<void> {
    return this.ref.remove(key);
  }

  deleteAll() {
    return this.ref.remove();
  }

  /**
   * Return objects matching the `key equals value` query
   * @param key model property name
   * @param value model property value
   */
  query(key, value): AngularFireList<ShoppingItem> {
    return this.db.list<ShoppingItem>(`/${this.path}/${this.uid}`, ref => ref.orderByChild(key).equalTo(value));
  }
}
