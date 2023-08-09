import { gql } from "apollo-angular";


// query

export const APPARTMENTS = gql`
query appartments{
  appartments{
    id,
    floor,
    letter,
    observation,
    building{
        id
        address,
        location,
    }
  }
}
`;

export const APPARTMENT = gql`
query appartment($id: String!){
    appartment(id: $id) {
        id,
        floor,
        letter,
        observation,
        building{
            id
            address,
            location,
        }
    }
}
`;



// mutations Variable \"$input\" of required type \
export const CREATE_APPARTMENT = gql`
    mutation createAppartment($input: CreateappartmentDTO!) {
      createAppartment(input: $input) {
        id,
        floor,
        letter,
        observation,
        building{
            id
            address,
            location,
        }
      }
    }
`;

// mutations
export const UPDATE_APPARTMENT = gql`
    mutation updateAppartment($input: UpdateappartmentDTO!) {
      updateAppartment(input: $input) {
        id,
        floor,
        letter,
        observation,
        building{
            id
            address,
            location,
        }
      }
    }
`;


// mutations
export const DELETE_APPARTMENT = gql`
    mutation deleteAppartment($id: String!) {
      deleteAppartment(id: $id) {
        id,
        floor,
        letter,
        observation,
        building{
            id
            address,
            location,
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