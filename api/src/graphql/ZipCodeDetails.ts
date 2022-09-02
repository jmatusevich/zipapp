import { objectType } from "nexus";
import { Place } from "./Place";

export const ZipCodeDetails = objectType({
    name: "ZipCodeDetails",
    definition(t) {
        t.nonNull.string("postCode");
        t.nonNull.string("country");
        t.nonNull.string("countryAbbreviation");
        t.nonNull.list.field('places', {
            type: Place
        })
    },
});