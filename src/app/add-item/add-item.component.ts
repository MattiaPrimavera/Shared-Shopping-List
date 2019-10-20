import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DbService } from '../db.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  title: string;
  description: string;

  addItemForm: FormGroup;

  constructor(private db: DbService) {
    this.addItemForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {}

  onSubmit() {
    const shoppingItem = this.addItemForm.value;
    this.db.addItem(shoppingItem);
  }
}
