import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemsService } from '../../../services/database/items.service';
import { ItemDataService } from '../../../services/item-data/item-data.service';
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
    private itemsService: ItemsService,
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
    await this.itemsService.delete(this.item.key);
    this.bottomSheetRef.dismiss({ error: false, isUpdate: false });
  }

  async updateItem() {
    const shoppingItem = this.updateItemForm.value;
    await this.itemsService.update(shoppingItem);
    this.dismiss({ error: false, isUpdate: true });
  }

  dismiss(data: any) {
    this.bottomSheetRef.dismiss(data);
  }
}
