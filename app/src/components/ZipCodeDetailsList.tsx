import { Box, Card, CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useMemo } from "react";
import {
  ZipCodeDetails,
  ZipCodePlace,
} from "../graphql/types/getZipCodeDetailsTypes";
import { getFlagEmoji } from "../helpers/emojiFlags";
export function ZipCodeDetailsList({ list }: { list: ZipCodeDetails[] }) {
  const detailsList = useMemo(() => {
    return list.map((anItem, index) => (
      <ZipDetailsCard {...anItem} primary={index === 0} key={index} />
    ));
  }, [list]);
  return (
    <Box
      sx={{
        "& > :not(style)": { mt: 1, width: "100%" },
      }}
    >
      {detailsList}
    </Box>
  );
}

export default function ZipDetailsCard({
  country,
  countryAbbreviation,
  postCode,
  places,
  primary = false,
}: ZipCodeDetails & { primary: boolean }) {
  const PlacesItems = useMemo(() => {
    return places.map((aPlace, index) => <PlaceCard {...aPlace} key={index} />);
  }, [places]);
  return (
    <Card sx={{ backgroundColor: primary ? "#fcf6e3" : undefined }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {getFlagEmoji(countryAbbreviation)} {country} ({countryAbbreviation})
          - {postCode}
        </Typography>
        {PlacesItems}
      </CardContent>
    </Card>
  );
}

function PlaceCard({
  placeName,
  latitude,
  longitude,
  state,
  stateAbbreviation,
}: ZipCodePlace) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {placeName}, {state} {stateAbbreviation}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {latitude}, {longitude}
        </Typography>
      </CardContent>
    </Card>
  );
}
