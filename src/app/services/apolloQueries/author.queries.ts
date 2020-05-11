import gql from 'graphql-tag';

export const GET_AUTHORS = gql`
{
  authors{
    _id,
    name,
    lastName,
    facePictureUrl
  }
}`;

export const CREATE_AUTHOR = gql`
mutation submitRepository ($name: String!, $lastName: String!, $facePictureUrl: String!) {
  addAuthor(name: $name, lastName: $lastName, facePictureUrl: $facePictureUrl) {
    _id,
    name,
    lastName,
    facePictureUrl
  }
}
`;

export const GET_PICTURES_BY_author_ID = gql`
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