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
import { ItemDataService } from './services/item-data/item-data.service';
import { UpdateItemComponent } from './ui/update-item/component/update-item.component';
import { DoneOnlyPipe } from './pipes/done-only.pipe';
import { ToDoOnlyPipe } from './pipes/to-do-only.pipe';
import { LoginComponent } from './login/login.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { GetUserUidFormComponent } from './get-user-uid-form/get-user-uid-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemComponent,
    AddItemComponent,
    UpdateItemComponent,
    DoneOnlyPipe,
    ToDoOnlyPipe,
    LoginComponent,
    ShoppingComponent,
    GetUserUidFormComponent,
  ],
  entryComponents: [
    AddItemComponent,
    UpdateItemComponent,
    GetUserUidFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatBottomSheetModule,
    MatSnackBarModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireAuth,
    AddItemBottomSheetService,
    UpdateItemBottomSheetService,
    ItemDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
