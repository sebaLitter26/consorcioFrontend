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
    images
    appartments{ 
      floor,
      letter,
      observation,
      id
    }
  }
}
`;

export const BUILDING = gql`
query building($id: String!){
    building(id: $id) {
        location
        address
        id
        images
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
        images
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
      updateBuilding(input: $input) {
        address
        location
        floors
        letter
        images
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
    mutation deleteBuilding($id: String!) {
      deleteBuilding(id: $id) {
        address
        location
        floors
        letter
        images
        appartments{ 
            floor
            letter
            observation
            id
        }
      }
    }
`;