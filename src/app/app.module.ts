import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ItemService } from './item.service';
import { UpdateItemComponent } from './update-item/update-item.component';
import { AddItemBottomSheetService } from './add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from './update-item-bottom-sheet.service';
import { ItemDataService } from './item-data.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
