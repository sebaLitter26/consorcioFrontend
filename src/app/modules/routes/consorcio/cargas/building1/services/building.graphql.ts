import { gql } from "apollo-angular";


// query

export const BUILDINGS = gql`
query buildings{
  buildings{
    address,
    appartments{ content}
  }
}
`;

export const login = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    token
  }
}
`;

export const getUsers = gql`
query {
  users {
    id
    name
    lastname
    email
    registerDate
  }
}
`;



// mutations
export const CREATE_BUILDING = gql`
    mutation createBuilding($input: UserInput!) {
      createBuilding(user: $input) {
        address,
        appartments{
          createdAt
        }
      }
    }
`;