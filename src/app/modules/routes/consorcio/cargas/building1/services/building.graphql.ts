import { gql } from "apollo-angular";


// query

export const BUILDINGS = gql`
query buildings{
  buildings{
    address,
    location,
    letter,
  	floors,
    id,
    appartments{ 
      floor,
      letter,
      observation,
      id
    }
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

/* export const getUsers = gql`
query {
  users {
    id
    name
    lastname
    email
    registerDate
  }
}
`; */

export const BUILDING = gql`
query building($id: string){
    building(id: $id) {
        location
        address
        id
        appartments{
          floor
          letter
          observation
          id
          ownerId
          tenantId
      }
    }
}
`;



// mutations Variable \"$input\" of required type \
export const CREATE_BUILDING = gql`
    mutation createBuilding($input: CreateBuildingDTO!) {
      createBuilding(input: $input) {
        address
        location
        floors
        letter
        appartments{ 
            floor
            letter
            observation
            id
        }
      }
    }
`;

// mutations
export const UPDATE_BUILDING = gql`
    mutation updateBuilding($input: UpdateBuildingDTO!) {
      updateBuilding(user: $input) {
        address
        location
        floors
        letter
        appartments{ 
            floor
            letter
            observation
            id
        }
      }
    }
`;


// mutations
export const DELETE_BUILDING = gql`
    mutation deleteBuilding($input: IDBuildingPayload) {
      deleteBuilding(user: $input) {
        address
        location
        floors
        letter
        appartments{ 
            floor
            letter
            observation
            id
        }
      }
    }
`;