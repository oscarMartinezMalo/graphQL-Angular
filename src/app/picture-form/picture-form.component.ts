import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { PictureService } from '../services/picture.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss']
})
export class PictureFormComponent implements OnInit {

  authors$;
  public id;

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
  ) {
  }

  ngOnInit(): void {
    this.authService.getAuthors();
    this.authors$ = this.authService.author$;

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.pictureService.getPictureById(this.id).subscribe((picture) => {
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

      if (this.id) { // Edit
        // this.pictureService.editPicture( this.id ,title, imageUrl, genre, authorId);
        console.log("Update");
        return;
      }

      this.pictureService.createPicture(title, imageUrl, genre, authorId);
      this.pictureForm.reset();
    }
  }

  onClear() {
    this.pictureForm.reset();
  }

}
