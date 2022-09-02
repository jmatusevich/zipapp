import { describe, expect, it } from "@jest/globals";
import { ZipAPIReducers } from "./ZipAPIReducers";
describe("zip API reducers", () => {
  describe("reducePlaces()", () => {
    const reducers = new ZipAPIReducers();
    it("throws if expected fields in response are missing", () => {
      const mockPlaces = [
        {
          "place name": "Somewhere",
        },
      ];
      expect(() => reducers.reducePlaces(mockPlaces)).toThrow(
        "MissingKeysFromPlaces"
      );
    });
    it("correctly transforms valid api responses to the right type", () => {
      const mockPlaces = [
        {
          "place name": "Beverly Hills",
          longitude: "-118.4065",
          state: "California",
          "state abbreviation": "CA",
          latitude: "34.0901",
        },
      ];

      const expectedResult = [
        {
          placeName: "Beverly Hills",
          longitude: "-118.4065",
          state: "California",
          stateAbbreviation: "CA",
          latitude: "34.0901",
        },
      ];
      expect(reducers.reducePlaces(mockPlaces)).toEqual(expectedResult);
    });
    it("doesn't leak extra data coming from response", () => {
      const mockPlaces = [
        {
          "place name": "Beverly Hills",
          longitude: "-118.4065",
          state: "California",
          "state abbreviation": "CA",
          latitude: "34.0901",
          unexpectedKey: "some value",
        },
      ];

      const expectedResult = [
        {
          placeName: "Beverly Hills",
          longitude: "-118.4065",
          state: "California",
          stateAbbreviation: "CA",
          latitude: "34.0901",
        },
      ];
      expect(reducers.reducePlaces(mockPlaces)).toEqual(expectedResult);
    });
  });
  describe("reduceDetails()", () => {
    const reducers = new ZipAPIReducers();
    it("throws if expected fields in response are missing", () => {
      const mockDetails = {
        "post code": "90210",
        places: [
          {
            "place name": "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            "state abbreviation": "CA",
            latitude: "34.0901",
          },
        ],
        country: "United States",
        //country abbreviation explicitly missing
      };

      expect(() => reducers.reduceDetails(mockDetails)).toThrow(
        "MissingKeysFromDetails"
      );
    });
    it("throws if places field in response can't be decoded", () => {
      const mockDetails = {
        "post code": "90210",
        places: [
          {
            "place name": "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            //state abbreviation explicitly missing
            latitude: "34.0901",
          },
        ],
        country: "United States",
        "country abbreviation": "US",
      };

      expect(() => reducers.reduceDetails(mockDetails)).toThrow(
        "MissingKeysFromPlaces"
      );
    });
    it("correctly transforms valid api responses to the right type", () => {
      const mockDetails = {
        "post code": "90210",
        places: [
          {
            "place name": "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            "state abbreviation": "CA",
            latitude: "34.0901",
          },
        ],
        country: "United States",
        "country abbreviation": "US",
      };

      const expectedResult = {
        postCode: "90210",
        places: [
          {
            placeName: "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            stateAbbreviation: "CA",
            latitude: "34.0901",
          },
        ],
        country: "United States",
        countryAbbreviation: "US",
      };

      expect(reducers.reduceDetails(mockDetails)).toEqual(expectedResult);
    });
    it("doesn't leak extra data coming from response", () => {
      const mockDetails = {
        "post code": "90210",
        places: [
          {
            "place name": "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            "state abbreviation": "CA",
            latitude: "34.0901",
            "more info": "some more",
          },
        ],
        country: "United States",
        "country abbreviation": "US",
        "other key": "other value",
      };

      const expectedResult = {
        postCode: "90210",
        places: [
          {
            placeName: "Beverly Hills",
            longitude: "-118.4065",
            state: "California",
            stateAbbreviation: "CA",
            latitude: "34.0901",
          },
        ],
        country: "United States",
        countryAbbreviation: "US",
      };

      expect(reducers.reduceDetails(mockDetails)).toEqual(expectedResult);
    });
  });
});
