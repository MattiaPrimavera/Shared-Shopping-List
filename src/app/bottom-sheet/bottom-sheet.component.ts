import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  providers: [AddItemComponent]
})
export class BottomSheetComponent implements OnInit {
  constructor(private bottomSheet: MatBottomSheet) {}

  ngOnInit() {}

  open(): void {
    this.bottomSheet.open(AddItemComponent);
  }

  close(): void {
    this.bottomSheet.dismiss();
  }
}
