import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  authors: Observable<any>;

  authorForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthorService
    ) { }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    if (this.authorForm.valid) {
      const name = this.authorForm.get('name').value;
      const lastName = this.authorForm.get('lastName').value;
      this.authService.createAuthor( name, lastName );

      this.authorForm.reset();
    }
  }

  onClear() {
    this.authorForm.reset();
  }

}
