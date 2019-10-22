import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from '../item.service';
import { ShoppingItem } from 'src/models/shopping-item';
import { ItemDataService } from '../item-data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit, AfterViewInit {
  updateItemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private itemDataService: ItemDataService
  ) {
    this.updateItemForm = new FormGroup({
      key: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const item = this.itemDataService.getUpdateItem();
    this.updateItemForm.patchValue(item);
  }

  deleteItem() {
    const { key } = this.updateItemForm.value;
    return this.itemService.delete(key);
  }

  updateItem() {
    const shoppingItem = this.updateItemForm.value;
    this.itemService.update(shoppingItem.key, shoppingItem);
  }
}
