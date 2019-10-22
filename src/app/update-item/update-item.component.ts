import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from '../item.service';
import { ItemDataService } from '../item-data.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit, AfterViewInit {
  updateItemForm: FormGroup;
  item: any;

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
    this.item = this.itemDataService.getUpdateItem();
    this.updateItemForm.patchValue(this.item);
  }

  async deleteItem() {
    this.itemService.delete(this.item.key);
  }

  async updateItem() {
    const shoppingItem = this.updateItemForm.value;
    this.itemService.update(shoppingItem.key, shoppingItem);
  }
}
