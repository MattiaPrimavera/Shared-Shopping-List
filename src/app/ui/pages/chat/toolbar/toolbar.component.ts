import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ChatToolbarComponent implements OnInit {
  @Output() onBackButton = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onBackClicked() {
    this.onBackButton.emit(null);
  }
}
