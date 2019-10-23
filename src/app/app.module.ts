import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AddItemComponent } from './ui/add-item/component/add-item.component';
import { ShoppingItemComponent } from './ui/shopping-item/shopping-item.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AddItemBottomSheetService } from './ui/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from './ui/update-item/bottom-sheet/update-item-bottom-sheet.service';
import { ItemService } from './services/item/item.service';
import { ItemDataService } from './services/item-data/item-data.service';
import { UpdateItemComponent } from './ui/update-item/component/update-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemComponent,
    AddItemComponent,
    UpdateItemComponent
  ],
  entryComponents: [
    AddItemComponent,
    UpdateItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule,
    MatSnackBarModule
  ],
  providers: [
    AngularFireDatabase,
    AddItemBottomSheetService,
    UpdateItemBottomSheetService,
    ItemDataService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
