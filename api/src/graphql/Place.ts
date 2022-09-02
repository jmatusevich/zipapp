import { objectType } from "nexus";

export const Place = objectType({
    name: "Place",
    definition(t) {
        t.nonNull.string("placeName");
        t.nonNull.string("state");
        t.nonNull.string("stateAbbreviation");
        t.nonNull.float("longitude");
        t.nonNull.float("latitude");
    },
});