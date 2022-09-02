import { extendType } from "nexus";

export const ZipCodeQuery = extendType({  // 2
    type: "Query",
    definition(t) {
        t.nullable.field("zipCodeDetails", {   // 3
            type: "ZipCodeDetails",
            resolve(parent, args, context, info) {    // 4
                return null;
            },
        });
    },
});