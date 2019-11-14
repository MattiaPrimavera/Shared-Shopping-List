import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { StoreService } from 'src/app/services/store/store.service';

interface Friend {
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  itemRef: AngularFireObject<Friend>;
  item: Observable<Friend>;
  userUid: string;

  constructor(private db: AngularFireDatabase, private store: StoreService) {
  }

  setupDatabase(uid: string) {
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
