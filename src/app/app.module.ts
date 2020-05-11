import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureFormComponent } from './components/picture-form/picture-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorService } from './services/author.service';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PictureListComponent } from './components/picture-list/picture-list.component';
import { PictureCardComponent } from './components/picture-card/picture-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { ScrollIconAnimationComponent } from './components/scroll-icon-animation/scroll-icon-animation.component';
import { ScrollableDirective } from './directives/scrollable.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureFormComponent,
    AuthorFormComponent,
    NavigationBarComponent,
    PictureListComponent,
    PictureCardComponent,
    ConfirmationDialogComponent,
    AuthorDetailComponent,
    ScrollIconAnimationComponent,
    ScrollableDirective,
    LoadingSpinnerComponent
  ],
  entryComponents: [
    AuthorFormComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    GraphQLModule,
    HttpClientModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
