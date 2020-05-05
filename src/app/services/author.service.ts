import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Author } from '../models/author.model';

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

    const GET_AUTHORS = gql`
    {
      authors{
        _id,
        name,
        lastName,
        facePictureUrl
      }
    }`;

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
    const CREATE_AUTHOR = gql`
    mutation submitRepository ($name: String!, $lastName: String!, $facePictureUrl: String!) {
      addAuthor(name: $name, lastName: $lastName, facePictureUrl: $facePictureUrl) {
        _id,
        name,
        lastName,
        facePictureUrl
      }
    }
    `;

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
    const GET_PICTURES_BY_author_ID = gql`
    query submitRepository($id: String!) {
      picturesByAuthor(id: $id) {
        name,
        lastName,
        facePictureUrl,
        pictures{
          title,
          imageUrl
        }
      }
    }`;

    return this.apollo
      .watchQuery({
        query: GET_PICTURES_BY_author_ID,
        variables: { id },
      })
      .valueChanges.pipe(map(result => result.data && result.data['picturesByAuthor']));
  }
}
