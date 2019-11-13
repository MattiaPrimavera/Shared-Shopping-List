import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

interface Friend {
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  uid: string;
  itemRef: AngularFireObject<Friend>;
  item: Observable<Friend>;
  userUid: string;

  constructor(private db: AngularFireDatabase) {
  }

  /**
   * Get firebase database references once the user
   * is logged in and its uid is known
   * @param uid Firebase user uid
   */
  setupFriendsDatabase(uid: string) {
    console.log(`Friends friends/${uid}`)
    this.uid = uid;
    this.itemRef = this.db.object<Friend>(`friends/${uid}`);
    this.item = this.itemRef.valueChanges();
  }

  async save(friends: Friend) {
    this.itemRef.set(friends);
  }

  async update(friends: Friend) {
    this.itemRef.update(friends);
  }

  async delete() {
    this.itemRef.remove();
  }
}
