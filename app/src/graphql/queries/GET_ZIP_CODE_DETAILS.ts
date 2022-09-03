import { gql, useLazyQuery } from "@apollo/client";
import {
  getZipCodeDetailsData,
  getZipCodeDetailsVars,
} from "../types/getZipCodeDetailsTypes";

export const GET_ZIP_CODE_DETAILS = gql`
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

export function useZipCodeDetailsQuery() {
  return useLazyQuery<getZipCodeDetailsData, getZipCodeDetailsVars>(
    GET_ZIP_CODE_DETAILS
  );
}
