import { Component, OnInit, Input, Output } from '@angular/core';
import { ChatMessage } from 'src/app/services/database/chat/chat.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @Input() messages: ChatMessage[];
  @Input('myUid') uid: string;

  constructor() { }

  ngOnInit() {}

  isMyMessage(message) {
    return message.uid === this.uid;
  }
}
