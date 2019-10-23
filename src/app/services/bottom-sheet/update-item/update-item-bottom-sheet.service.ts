import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UpdateItemComponent } from '../../../update-item/update-item.component';
import { ItemDataService } from '../../item-data/item-data.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateItemBottomSheetService {
  constructor(
    private bottomSheet: MatBottomSheet,
    private itemDataService: ItemDataService) {}

  open(): MatBottomSheetRef<UpdateItemComponent, any> {
    return this.bottomSheet.open(UpdateItemComponent, {
      data: this.itemDataService.getUpdateItem()
    });
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
