import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './view/crud/crud.component';
import { UiTrainingComponent } from './view/ui-training/ui-training.component';

export const routes: Routes = [
{path:"",component:CrudComponent,title:'CRUD'},
{path:"ui-training",component:UiTrainingComponent,title:'ui-training'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
