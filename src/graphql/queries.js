export const getGame = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    timestamp
    winner
    first
    mydeck
    oppdeck
    memo 
    createdAt
    updatedAt
    __typename
  }
}
`;
export const listGames = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      timestamp
      winner
      first
      mydeck
      oppdeck
      memo
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
`;