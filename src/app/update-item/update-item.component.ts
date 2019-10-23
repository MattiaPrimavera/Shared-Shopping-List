import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from '../services/item/item.service';
import { ItemDataService } from '../services/item-data/item-data.service';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

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
    private itemDataService: ItemDataService,
    private bottomSheetRef: MatBottomSheetRef
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
    await this.itemService.delete(this.item.key);
    this.bottomSheetRef.dismiss(false);
  }

  async updateItem() {
    const shoppingItem = this.updateItemForm.value;
    await this.itemService.update(shoppingItem.key, shoppingItem);
    this.dismiss(true);
  }

  dismiss(isUpdateOperation: boolean) {
    this.bottomSheetRef.dismiss(isUpdateOperation);
  }
}
