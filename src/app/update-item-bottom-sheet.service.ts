import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { UpdateItemComponent } from './update-item/update-item.component';
import { ItemDataService } from './item-data.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateItemBottomSheetService {
  constructor(
    private bottomSheet: MatBottomSheet,
    private itemDataService: ItemDataService) {}

  open(): void {
    this.bottomSheet.open(UpdateItemComponent, {
      data: this.itemDataService.getUpdateItem()
    });
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
