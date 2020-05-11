import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Author } from '../models/author.model';
import { GET_AUTHORS, CREATE_AUTHOR, GET_PICTURES_BY_author_ID } from './apolloQueries/author.queries';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authors: Author[] = [];
  private authorsSubject$ = new Subject();
  author$ = this.authorsSubject$.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  getAuthors() {



    this.apollo
      .watchQuery({
        query: GET_AUTHORS,
      })
      .valueChanges.pipe(map(result => result.data && result.data['authors'])).
      subscribe(resp => {
        this.authors = resp;
        this.authorsSubject$.next(this.authors);
      });
  }

  createAuthor(name: string, lastName: string, facePictureUrl: string) {
    this.apollo.mutate({
      mutation: CREATE_AUTHOR,
      variables: { name, lastName, facePictureUrl }
    }).subscribe(({ data }) => {
      this.authors.push(data['addAuthor']);
      this.authorsSubject$.next(this.authors);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  getPicturesByAuthorId(id: string) {
    return this.apollo
      .watchQuery({
        query: GET_PICTURES_BY_author_ID,
        variables: { id },
      })
      .valueChanges.pipe(map(result => result.data && result.data['picturesByAuthor']));
  }
}
