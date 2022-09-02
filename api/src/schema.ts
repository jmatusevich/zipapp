const {gql} = require('apollo-server');

const typeDefs = gql`
  type Place {
    latitude: Float!
    longitude: Float!
    placeName: String!
    state: String!
    stateAbbreviation: String!
  }

  type ZipCodeDetails {
    country: String!
    countryAbbreviation: String!
    places: [Place]!
    postCode: String!
  }

  type Query {
    zipCodeDetails(countryCode: String!, zipCode: String!): ZipCodeDetails
  }
`;

export default typeDefs;