import { useZipCodeDetailsQuery } from "../graphql/queries/GET_ZIP_CODE_DETAILS";
import Card from "@mui/material/Card";
import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { countries } from "../reference/countries";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import { getFlagEmoji } from "../helpers/emojiFlags";

function ZipCodeQueryView() {
  const options = useMemo(() => {
    return countries.map((aCountry) => ({
      label: `${getFlagEmoji(aCountry.countryCode)} ${aCountry.name}`,
      id: aCountry.countryCode,
    }));
  }, []);

  const [countrySelectedOption, setCountrySelectedOption] = useState<{
    label: string;
    id: string;
  } | null>(options.find((anOption) => anOption.id == "US") ?? null);

  const onChangeCountry = useCallback(
    (event: any, newValue: { label: string; id: string } | null) => {
      setCountrySelectedOption(newValue);
    },
    [setCountrySelectedOption]
  );

  const [zipCode, setZipCode] = useState<string>("");

  const onChangeZipCode: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (event) => {
      setZipCode(event.target.value);
    },
    [setZipCode]
  );

  const [findZipCode, { loading, data }] = useZipCodeDetailsQuery({
    countryCode: countrySelectedOption?.id ?? "US",
    zipCode,
  });

  return (
    <div>
      <Typography variant="h2" component="h1">
        Zip Code Finder
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
      >
        <Stack spacing={2} direction="row">
          <Autocomplete
            disablePortal
            id="country_select"
            value={countrySelectedOption}
            onChange={onChangeCountry}
            options={options}
            sx={{ width: "75%" }}
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          <TextField
            id="zipcode_field"
            label="ZipCode"
            variant="outlined"
            value={zipCode}
            sx={{ width: "25%" }}
            onChange={onChangeZipCode}
          />
        </Stack>
        <LoadingButton
          onClick={() => findZipCode()}
          loading={loading}
          disabled={!countrySelectedOption || !zipCode.length}
          loadingIndicator="Loading…"
          variant="outlined"
        >
          Search
        </LoadingButton>
        {JSON.stringify(data)}
      </Box>
    </div>
  );
}

export default ZipCodeQueryView;
