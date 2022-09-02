import { RESTDataSource } from "apollo-datasource-rest";
import { ZipAPIReducers } from "./ZipAPIReducers";

export class ZipAPIDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.zippopotam.us/";
  }

  reducers = new ZipAPIReducers();

  public async getZipCodeDetails({
    countryCode,
    zipCode,
  }: {
    countryCode: string;
    zipCode: string;
  }) {
    const rawDetails = await this.get(
      `${encodeURIComponent(countryCode)}/${encodeURIComponent(zipCode)}`
    );
    try {
      return this.reducers.reduceDetails(rawDetails);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
