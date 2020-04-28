import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { Observable } from 'rxjs';
import { Author } from '../models/author.model';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss']
})
export class PictureFormComponent implements OnInit {

  authors$;

  pictureForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    imageUrl: ['', [Validators.required, Validators.minLength(5)]],
    genre: ['', [Validators.required, Validators.minLength(3)]],
    authorId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthorService,
    private pictureService: PictureService
    ) { }

  ngOnInit(): void {
    this.authService.getAuthors();
    this.authors$ = this.authService.author$;
  }

  onSubmit() {
    if (this.pictureForm.valid) {
      const title = this.pictureForm.get('title').value;
      const imageUrl = this.pictureForm.get('imageUrl').value;
      const genre = this.pictureForm.get('genre').value;
      const authorId = this.pictureForm.get('authorId').value;

      this.pictureService.createPicture(title, imageUrl, genre, authorId);
      this.pictureForm.reset();
    }
  }

  onClear() {
      this.pictureForm.reset();
  }

}
