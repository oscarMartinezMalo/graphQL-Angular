import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureEditComponent } from './picture-edit/picture-edit.component';
import { PictureListComponent } from './picture-list/picture-list.component';


const routes: Routes = [
  { path: '', component: PictureListComponent },
  { path: 'pictures/', component: PictureListComponent },
  { path: 'pictures/:id', component: PictureEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
