import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Picture } from '../models/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private pictures: Picture[] = [];
  private picturesSubject$ = new Subject();
  pictures$ = this.picturesSubject$.asObservable();

  constructor(
    private apollo: Apollo
    ) { }

  getpictures() {
    const GET_PICTURES = gql`
    {
      pictures{
        _id,
        title,
        imageUrl,
        author {
          name,
          lastName
         }
      }
    }`;

    this.apollo
      .watchQuery({
        query: GET_PICTURES,
      })
      .valueChanges.pipe(map(result => result.data && result.data['pictures'])).
      subscribe(resp => {
        this.pictures = resp;
        this.picturesSubject$.next(this.pictures);
      });
  }

  createPicture(title: string, imageUrl: string, genre: string, authorId: string) {
    const CREATE_PICTURE = gql`
    mutation submitRepository ($title: String!, $imageUrl: String!, $genre: String!, $authorId: String!) {
      addPicture(title: $title, imageUrl: $imageUrl, genre: $genre, authorId: $authorId) {
        _id,
        title,
        imageUrl,
        genre,
        authorId,
        author{
          name,
          lastName
        }
      }
    }
    `;

    this.apollo.mutate({
      mutation: CREATE_PICTURE,
      variables: { title, imageUrl, genre, authorId }
    }).subscribe(({ data }) => {
      this.pictures.push(data['addPicture']);
      this.picturesSubject$.next(this.pictures);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  deletePicture( id: string) {
    const DELETE_PICTURE = gql`
    mutation submitRepository ($id: String!)  {
      deletePicture(id: $id){
        _id
      }
    }
    `;

    this.apollo.mutate({
      mutation: DELETE_PICTURE,
      variables: { id }
    }).subscribe(({ data }) => {
      const deletedIndex = this.pictures.findIndex(pic => pic._id === data['deletePicture']._id);
      this.pictures.splice( deletedIndex, 1 );
      this.picturesSubject$.next( this.pictures );
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

