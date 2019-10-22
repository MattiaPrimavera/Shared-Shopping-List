import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from '../item.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  title: string;
  description: string;

  addItemForm: FormGroup;

  constructor(
    private itemService: ItemService,
    private bottomSheet: MatBottomSheet,
  ) {
    this.addItemForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnInit() {}

  async onSubmit() {
    const shoppingItem = this.addItemForm.value;
    await this.itemService.add(shoppingItem);
    this.bottomSheet.dismiss();
  }
}
