import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureFormComponent } from './picture-form/picture-form.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';


const routes: Routes = [
  { path: '', component: PictureListComponent },
  { path: 'pictures/', component: PictureListComponent },
  { path: 'pictures/new', component: PictureFormComponent },
  { path: 'pictures/:id', component: PictureFormComponent },
  { path: 'author-detail/:id', component: AuthorDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
