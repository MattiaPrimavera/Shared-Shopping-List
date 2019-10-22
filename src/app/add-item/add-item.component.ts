import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  title: string;
  description: string;

  addItemForm: FormGroup;

  constructor(private itemService: ItemService) {
    this.addItemForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {}

  onSubmit() {
    const shoppingItem = this.addItemForm.value;
    this.itemService.add(shoppingItem);
  }
}
