import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { PictureService } from '../../services/picture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../models/author.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthorFormComponent } from '../author-form/author-form.component';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss']
})
export class PictureFormComponent implements OnInit {

  authors$;
  public idUrlparameter;
  author;


  pictureForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    imageUrl: ['', [Validators.required, Validators.minLength(5)]],
    genre: ['', [Validators.required, Validators.minLength(3)]],
    authorId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthorService,
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.authService.author$.subscribe((authors: Author[]) => {
      this.pictureForm.get('authorId').valueChanges.subscribe(authorId => {
        const author = authors.find(auth => auth._id === authorId);
        this.author = author;
      })
    })
  }

  ngOnInit(): void {
    this.authService.getAuthors();
    this.authors$ = this.authService.author$;

    this.idUrlparameter = this.route.snapshot.paramMap.get('id');
    if (this.idUrlparameter) {
      this.pictureService.getPictureById(this.idUrlparameter).subscribe((picture) => {
        this.pictureForm.setValue({
          title: picture.title,
          imageUrl: picture.imageUrl,
          genre: picture.genre,
          authorId: picture.authorId
        });
      });

      // Fill the form
    }
  }

  onSubmit() {
    if (this.pictureForm.valid) {
      const title = this.pictureForm.get('title').value;
      const imageUrl = this.pictureForm.get('imageUrl').value;
      const genre = this.pictureForm.get('genre').value;
      const authorId = this.pictureForm.get('authorId').value;

      if (this.idUrlparameter) { // Edit
        this.pictureService.updatePicture(this.idUrlparameter, title, imageUrl, genre, authorId).subscribe( ({ data }) =>{
          this.router.navigate(['/']);
        }, (error) => {
            console.log('There was an error sending the query', error);
          });
      } else {
        this.pictureService.createPicture(title, imageUrl, genre, authorId);
      }

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '285px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClear() {
    this.pictureForm.reset();
  }


}
