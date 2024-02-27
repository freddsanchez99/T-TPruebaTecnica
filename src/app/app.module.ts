import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SelectComponent } from './select/select.component';
import { NgIf } from '@angular/common';
import { InputComponent } from './input/input.component';
import {MatIconModule} from '@angular/material/icon';
import { UserModalComponent } from './user-modal/user-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    SelectComponent,
    InputComponent,
    UserModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgIf,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

