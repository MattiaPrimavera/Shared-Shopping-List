import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddItemComponent } from './add-item/add-item.component';

@Injectable({
  providedIn: 'root'
})
export class AddItemBottomSheetService {

  constructor(private bottomSheet: MatBottomSheet) {}

  open(): void {
    this.bottomSheet.open(AddItemComponent);
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
