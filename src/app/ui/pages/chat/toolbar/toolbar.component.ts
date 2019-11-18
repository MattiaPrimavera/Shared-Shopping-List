import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ChatToolbarComponent implements OnInit {
  @Output() onBack = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onBackClicked() {
    this.onBack.emit(null);
  }
}
