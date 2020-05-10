import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Picture } from '../models/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private pictures: Picture[] = [];
  private picturesSubject$ = new Subject();
  pictures$ = this.picturesSubject$.asObservable();

  public done$ = new BehaviorSubject(false);
  public loading$ = new BehaviorSubject(false);

  constructor(
    private apollo: Apollo
  ) { }

  // getPictures() {
  //   const GET_PICTURES = gql`
  //   {
  //     pictures{
  //       _id,
  //       title,
  //       imageUrl,
  //       authorId,
  //       author {
  //         name,
  //         lastName,
  //         facePictureUrl
  //        }
  //     }
  //   }`;

  //   this.apollo
  //     .watchQuery({
  //       query: GET_PICTURES,
  //     })
  //     .valueChanges.pipe(map(result => result.data && result.data['pictures'])).
  //     subscribe(resp => {
  //       console.log(resp);
  //       this.pictures = resp;
  //       this.picturesSubject$.next(this.pictures);
  //     });
  // }

  getPicturesOffset(offsetValue?: number) {
    
    const offset =(offsetValue === 0) ? 0 : this.pictures.length;

    const GET_PICTURES_OFFSET = gql`
    query submitRepository($offSet: Int!) {
      picturesOffSet(offSet: $offSet) {
        _id,
        title,
        imageUrl,
        authorId,
        author {
          name,
          lastName,
          facePictureUrl
         }
      }
    }`;

    return this.apollo
      .watchQuery({
        query: GET_PICTURES_OFFSET,
        variables: { offSet: offset },
      })
      .valueChanges.
      pipe(map(result => result.data && result.data['picturesOffSet']));
  }

  public async getPicturesInfiniteScroll() {
    if (this.done$.value || this.loading$.value) { return }

    // loading
    this.loading$.next(true);

    // call to get the data
    this.getPicturesOffset().pipe(take(1)).subscribe(resp => {
      // no more data mark as done
      if (!resp.length) {
        this.done$.next(true);
      }
      // update source with new value, done loading
      this.pictures.push(...resp);
      this.picturesSubject$.next(this.pictures);

      this.loading$.next(false);
    });

  }

  public getInitialPicturesInfiniteScroll() {
    // loading
    this.loading$.next(true);

    // call to get the data
    this.getPicturesOffset(0).pipe(take(1)).subscribe(resp => {
      // no more data mark as done
      if (!resp.length) {
        this.done$.next(true);
      }
      // update source with new value, done loading
      this.pictures = resp;
      this.picturesSubject$.next(this.pictures);

      this.loading$.next(false);
    });
  }

  getPictureById(id: string) {
    const GET_PICTURES_BY_ID = gql`
    query submitRepository($id: String!) {
     picture(id: $id) {
       _id,
        title,
        imageUrl,
        genre,
        authorId
      }
    }`;

    return this.apollo
      .watchQuery({
        query: GET_PICTURES_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(map(result => result.data && result.data['picture']));
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
          lastName,
          facePictureUrl
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

  updatePicture(id: string, title: string, imageUrl: string, genre: string, authorId: string) {
    const UPDATE_PICTURE = gql`
    mutation submitRepository ($id: String!, $title: String!, $imageUrl: String!, $genre: String!, $authorId: String!) {
      updatePicture(id: $id, title: $title, imageUrl: $imageUrl, genre: $genre, authorId: $authorId) {
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
      mutation: UPDATE_PICTURE,
      variables: { id, title, imageUrl, genre, authorId }
    }).subscribe(({ data }) => {
      // this.pictures.push(data['addPicture']);
      // this.picturesSubject$.next(this.pictures);
    }, (error) => {
      console.log('There was an error sending the query', error);
    });
  }

  deletePicture(id: string) {
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
      this.pictures.splice(deletedIndex, 1);
      this.picturesSubject$.next(this.pictures);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}

