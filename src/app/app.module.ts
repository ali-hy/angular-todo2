import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

import { HttpClientModule } from '@angular/common/http';
import { TaskAdderComponent } from './task-adder/task-adder.component';
import { TitleComponent } from './title/title.component';
import { FiltersComponent } from './filters/filters.component';

import { CategoryAdderComponent } from './category-adder/category-adder.component';
import { CategoryRemoverComponent } from './category-remover/category-remover.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskAdderComponent,
    TitleComponent,
    FiltersComponent,
    CategoryAdderComponent,
    CategoryRemoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoryAdderComponent,
    CategoryRemoverComponent
  ]
})
export class AppModule { }
