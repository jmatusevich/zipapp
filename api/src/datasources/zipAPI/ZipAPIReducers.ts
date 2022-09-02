import { Place } from "../../types/Place";
import { ZipDetails } from "../../types/ZipDetails";

export class ZipAPIReducers {
  public reduceDetails(rawDetails: any): ZipDetails {
    const rawKeys = Object.keys(rawDetails);
    if (
      !["post code", "country", "country abbreviation", "places"].every(
        (aKey) => rawKeys.includes(aKey)
      )
    ) {
      // The API didn't return fields as exepcted
      throw new Error("MissingKeysFromDetails");
    }
    const rawPlaces = rawDetails["places"];

    return {
      postCode: rawDetails["post code"],
      country: rawDetails["country"],
      countryAbbreviation: rawDetails["country abbreviation"],
      places: this.reducePlaces(rawPlaces),
    };
  }

  public reducePlaces(rawPlaces: any): Place[] {
    if (!Array.isArray(rawPlaces)) {
      // places doesn't match the schema
      throw new Error("InvalidPlacesField");
    }

    if (
      !rawPlaces.every((aRawPlace) => {
        //check place by place that the keys match or return null
        const rawKeys = Object.keys(aRawPlace);
        console.log(rawKeys);
        return [
          "place name",
          "longitude",
          "latitude",
          "state",
          "state abbreviation",
        ].every((aKey) => rawKeys.includes(aKey));
      })
    ) {
      throw new Error("MissingKeysFromPlaces");
    }
    return rawPlaces.map((aRawPlace) => ({
      placeName: aRawPlace["place name"],
      longitude: aRawPlace["longitude"],
      latitude: aRawPlace["latitude"],
      state: aRawPlace["state"],
      stateAbbreviation: aRawPlace["state abbreviation"],
    }));
  }
}
