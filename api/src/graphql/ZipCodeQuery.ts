import { extendType } from "nexus";
import zipCodeDetailsResolver from "../resolvers/zipCodeDetailsResolver";

export const ZipCodeQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nullable.field("zipCodeDetails", {   // 3
            type: "ZipCodeDetails",
            resolve: zipCodeDetailsResolver
        });
    },
});