import { Place } from "./Place";

export type ZipDetails = {
  postCode: string;
  country: string;
  countryAbbreviation: string;
  places: Place[];
};
