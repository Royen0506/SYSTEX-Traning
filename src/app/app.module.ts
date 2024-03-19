import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrudComponent } from './view/crud/crud.component';
import { UiTrainingComponent } from './view/ui-training/ui-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudTableComponent } from './view/crud/components/crud-table/crud-table.component';
import { CrudFormComponent } from './view/crud/components/crud-form/crud-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    UiTrainingComponent,
    CrudTableComponent,
    CrudFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
