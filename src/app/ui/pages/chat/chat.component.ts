import { Component, AfterViewInit } from '@angular/core';
import { ChatService, ChatMessage } from 'src/app/services/database/chat/chat.service';
import { StoreService } from 'src/app/services/store/store.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements AfterViewInit {
  messages: Observable<ChatMessage[]>
  newMessageForm: FormGroup;
  uid: string;

  constructor(
    private chatService: ChatService,
    private store: StoreService,
    private router: Router
  ) {
    this.newMessageForm = new FormGroup({
      text: new FormControl(''),
    });
  }

  ngAfterViewInit() {
    try {
      const state = this.store.getState();
      if (!state) throw 'Missing state';

      this.uid = state.uid;
      if (!this.uid) throw 'Missing uid';

      const joinUserUid = state.joinUserUid;
      console.log(`Chat uid (joinUserUid): ${joinUserUid}, myUid: ${this.uid}`)
      this.chatService.setupDatabase(joinUserUid || this.uid);
      this.messages = this.chatService.list();
    } catch (err) {
      this.router.navigate(['shopping'])
    }
  }

  async sendMessage(message: ChatMessage) {
    try {
      const state = this.store.getState();
      message.uid = state.uid;
      this.chatService.add(message);
      this.newMessageForm.reset();
    } catch (err) {
      console.error(`[chat] sendMessage`, err)
    }
  }

  async onSubmit() {
    const message = this.newMessageForm.value;
    console.log(`New message ${message}`);
    return this.sendMessage(message);
  }

  openShoppingList() {
    this.router.navigate(['shopping'])
  }
}
