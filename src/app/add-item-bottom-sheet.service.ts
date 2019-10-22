import { Injectable } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddItemComponent } from './add-item/add-item.component';

@Injectable({
  providedIn: 'root'
})
export class AddItemBottomSheetService {
  constructor(private bottomSheet: MatBottomSheet) {}

  open(): MatBottomSheetRef<AddItemComponent, any> {
    return this.bottomSheet.open(AddItemComponent);
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
