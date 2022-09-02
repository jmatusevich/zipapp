import { getZipCodeDetailsResolver } from "./getZipCodeDetailsResolver";

export default {
  Query: {
    getZipCodeDetails: getZipCodeDetailsResolver,
  },
};
