import { ZipAPIDataSource } from "../datasources/zipAPI/ZipAPIDataSource";

type DataSourcesType = {
  zipAPI: ZipAPIDataSource;
};

type zipCodeDetailsArgs = {
  countryCode: string;
  zipCode: string;
};

export const getZipCodeDetailsResolver = (
  _: any,
  { countryCode, zipCode }: zipCodeDetailsArgs,
  { dataSources }: { dataSources: DataSourcesType }
) => {
  return dataSources.zipAPI.getZipCodeDetails({ countryCode, zipCode });
};
