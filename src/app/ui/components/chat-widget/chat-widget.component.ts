import { Component, OnInit, Input, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ChatMessage } from 'src/app/services/database/chat/chat.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @Input() messages: ChatMessage[];
  @Input('myUid') uid: string;
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  isNearBottom: boolean;

  constructor() { }

  ngOnInit() {}

  isMyMessage(message) {
    return message.uid === this.uid;
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
    this.scrollToBottom();
  }

  private onItemElementsChanged(): void {
    if (true) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.height,
      left: 0,
      behavior: 'smooth'
    });
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }
}
