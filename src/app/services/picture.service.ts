import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map, take } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Picture } from '../models/picture.model';
import { GET_PICTURES_OFFSET, GET_PICTURES_BY_ID, CREATE_PICTURE, UPDATE_PICTURE, DELETE_PICTURE } from './apolloQueries/pictures.queries';

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

  //  private getPicturesOffset(offsetValue?: number) {
  //     const offset = (offsetValue === 0) ? 0 : this.pictures.length;
  //     return this.apollo
  //       .watchQuery({
  //         query: GET_PICTURES_OFFSET,
  //         variables: { offSet: offset },
  //       })
  //       .valueChanges.
  //       pipe(map(result => result.data && result.data['picturesOffSet']));
  //   }

  public async getPicturesInfiniteScroll(offsetValue?: number) {
    const offset = (offsetValue === 0) ? 0 : this.pictures.length;

    if (this.done$.value || this.loading$.value) { return }
    this.loading$.next(true);

    return this.apollo
      .watchQuery({
        query: GET_PICTURES_OFFSET,
        variables: { offSet: offset },
      })
      .valueChanges.
      pipe(map(result => result.data && result.data['picturesOffSet'])).pipe(take(1)).subscribe(resp => {
        // no more data mark as done
        if (!resp.length) {
          this.done$.next(true);
        }

        // update source with new value, done loading
        (offsetValue === 0) ? this.pictures = resp : this.pictures.push(...resp);

        this.picturesSubject$.next(this.pictures);
        this.loading$.next(false);
      });
  }

  getPictureById(id: string) {
    return this.apollo
      .watchQuery({
        query: GET_PICTURES_BY_ID,
        variables: { id },
      })
      .valueChanges.pipe(map(result => result.data && result.data['picture']));
  }

  createPicture(title: string, imageUrl: string, genre: string, authorId: string) {
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
    return this.apollo.mutate({
      mutation: UPDATE_PICTURE,
      variables: { id, title, imageUrl, genre, authorId },
      // refetchQueries: [{ query: GET_PICTURES_OFFSET, variables: { offSet: this.pictures.length } }]
    }).pipe(map(resp => {
      // Reset the catch so the Pictures List can be updated
      this.apollo.getClient().resetStore();
      return resp;
    }))
  }

  deletePicture(id: string) {
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

