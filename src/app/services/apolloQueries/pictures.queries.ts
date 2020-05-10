import gql from 'graphql-tag';

export const GET_PICTURES_OFFSET = gql`
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

export const GET_PICTURES_BY_ID = gql`
query submitRepository($id: String!) {
 picture(id: $id) {
   _id,
    title,
    imageUrl,
    genre,
    authorId
  }
}`;

export const CREATE_PICTURE = gql`
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
}`;

export const UPDATE_PICTURE = gql`
mutation submitRepository ($id: String!, $title: String!, $imageUrl: String!, $genre: String!, $authorId: String!) {
  updatePicture(id: $id, title: $title, imageUrl: $imageUrl, genre: $genre, authorId: $authorId) {
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

export const DELETE_PICTURE = gql`
mutation submitRepository ($id: String!)  {
  deletePicture(id: $id){
    _id
  }
}
`;
