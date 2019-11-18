import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AddItemComponent } from './ui/components/add-item/component/add-item.component';
import { ShoppingItemComponent } from './ui/components/shopping-item/shopping-item.component';
import { AddItemBottomSheetService } from './ui/components/add-item/bottom-sheet/add-item-bottom-sheet.service';
import { UpdateItemBottomSheetService } from './ui/components/update-item/bottom-sheet/update-item-bottom-sheet.service';
import { UpdateItemComponent } from './ui/components/update-item/component/update-item.component';
import { GetUserUidFormComponent } from './ui/modals/get-user-uid-form/get-user-uid-form.component';
import { ShoppingComponent } from './ui/pages/shopping/shopping.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ItemDataService } from './services/item-data/item-data.service';
import { DoneOnlyPipe } from './pipes/done-only/done-only.pipe';
import { ToDoOnlyPipe } from './pipes/to-do-only/to-do-only.pipe';
import { InviteUserComponent } from './ui/modals/invite-user/invite-user.component';
import { QRCodeModule, QRCodeComponent } from 'angular2-qrcode';
import { MenuToolbarComponent } from './ui/components/menu-toolbar/toolbar/toolbar.component';
import { MenuComponent } from './ui/components/menu-toolbar/menu/menu.component';
import { LoadingScreenComponent } from './ui/components/loading-screen/loading-screen.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JoinComponent } from './ui/components/join/join.component';
import { ChatComponent } from './ui/pages/chat/chat.component';
import { ChatWidgetComponent } from './ui/components/chat-widget/chat-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingItemComponent,
    AddItemComponent,
    UpdateItemComponent,
    DoneOnlyPipe,
    ToDoOnlyPipe,
    ShoppingComponent,
    GetUserUidFormComponent,
    InviteUserComponent,
    MenuToolbarComponent,
    MenuComponent,
    LoadingScreenComponent,
    JoinComponent,
    ChatComponent,
    ChatWidgetComponent,
  ],
  entryComponents: [
    AddItemComponent,
    UpdateItemComponent,
    GetUserUidFormComponent,
    InviteUserComponent,
    JoinComponent,
    QRCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatToolbarModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AddItemBottomSheetService,
    UpdateItemBottomSheetService,
    ItemDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
