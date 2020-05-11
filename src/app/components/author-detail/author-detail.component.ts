import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

  idUrlparameter;
  author;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idUrlparameter = this.route.snapshot.paramMap.get('id');
    this.authorService.getPicturesByAuthorId( this.idUrlparameter).
    subscribe(author => this.author = author);
    // Get pictures by author ID
  }



}
