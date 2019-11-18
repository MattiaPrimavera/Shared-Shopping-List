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

      const uid = state.uid;
      if (!uid) throw 'Missing uid';

      const joinUserUid = state.joinUserUid;
      console.log(`Chat uid: ${uid}`)
      this.chatService.setupDatabase(joinUserUid || uid);
      this.messages = this.chatService.list();
    } catch (err) {
      this.router.navigate(['shopping'])
    }
  }

  async sendMessage(message: ChatMessage) {
    const state = this.store.getState();
    message.uid = state.uid;
    this.chatService.add(message);
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
