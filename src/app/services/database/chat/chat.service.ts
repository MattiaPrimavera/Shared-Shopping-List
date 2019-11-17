import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BaseService } from '../base-service/base-service';
import { StoreService } from 'src/app/services/store/store.service';
import { FriendsService } from '../friends/friends.service';
import { Observable } from 'rxjs';

export class ChatMessage {
  key?: string;
  uid: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService<ChatMessage> {
  sourceUid: string;
  destUid: string;
  messages: Observable<ChatMessage[]>

  constructor(
    db: AngularFireDatabase,
    store: StoreService,
    private friendsService: FriendsService
  ) {
    super('chat', db, store);
  }

  /**
   * Get firebase database references once the user
   * is logged in and its uid is known
   * @param uid Firebase user uid
   */
  setupDatabase(uid: string) {
    this.friendsService.setupDatabase(uid);
    this.ref = this.db.list<ChatMessage>(`chat/${uid}`);
    this.friendsService.get()
      .subscribe(friend => {
        if (friend) {
          this.destUid = friend.uid;
          console.log(`[items.service] fetching chat/${uid}`);
        }
      })
  }
}
