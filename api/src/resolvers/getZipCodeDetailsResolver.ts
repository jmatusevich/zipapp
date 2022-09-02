import { ZipAPIDataSource } from "../datasources/zipAPI/ZipAPIDataSource";
import { GetZipCondeDetailsArgs } from "../types/GetZipCodeDetailsArgs";

type DataSourcesType = {
  zipAPI: ZipAPIDataSource;
};

export const getZipCodeDetailsResolver = (
  _: any,
  { countryCode, zipCode }: GetZipCondeDetailsArgs,
  { dataSources }: { dataSources: DataSourcesType }
) => {
  return dataSources.zipAPI.getZipCodeDetails({ countryCode, zipCode });
};
