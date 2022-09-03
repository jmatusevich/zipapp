export interface ZipCodePlace {
  latitude: number;
  longitude: number;
  placeName: string;
  state: string;
  stateAbbreviation: string;
}

export interface ZipCodeDetails {
  postCode: string;
  country: string;
  countryAbbreviation: string;
  places: ZipCodePlace[];
}

export interface getZipCodeDetailsData {
  getZipCodeDetails: ZipCodeDetails;
}

export interface getZipCodeDetailsVars {
  countryCode: string;
  zipCode: string;
}
