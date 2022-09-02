import { gql, useQuery } from "@apollo/client";
import {
  getZipCodeDetailsData,
  getZipCodeDetailsVars,
} from "../types/getZipCodeDetailsTypes";

export const GET_ROCKET_INVENTORY = gql`
  query GetZipCodeDetails($countryCode: String!, $zipCode: String!) {
    getZipCodeDetails(countryCode: $countryCode, zipCode: $zipCode) {
      country
      countryAbbreviation
      postCode
      places {
        latitude
        longitude
        placeName
        state
        stateAbbreviation
      }
    }
  }
`;

export function useZipCodeDetailsQuery({
  countryCode,
  zipCode,
}: getZipCodeDetailsVars) {
  return useQuery<getZipCodeDetailsData, getZipCodeDetailsVars>(
    GET_ROCKET_INVENTORY,
    {
      variables: { countryCode, zipCode },
    }
  );
}
