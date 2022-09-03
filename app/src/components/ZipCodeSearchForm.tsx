import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import {
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { getZipCodeDetailsVars } from "../graphql/types/getZipCodeDetailsTypes";
import { getFlagEmoji } from "../helpers/emojiFlags";
import { countries } from "../reference/countries";

export function ZipCodeSearchForm({
  onSearch,
  onClear,
  clearDisabled,
  loading,
}: {
  onSearch: (args: getZipCodeDetailsVars) => void;
  onClear: () => void;
  clearDisabled: boolean;
  loading: boolean;
}) {
  const options = useMemo(() => {
    return countries.map((aCountry) => ({
      label: `${getFlagEmoji(aCountry.countryCode)} ${aCountry.name}`,
      id: aCountry.countryCode,
    }));
  }, []);

  const [countrySelectedOption, setCountrySelectedOption] = useState<{
    label: string;
    id: string;
  } | null>(options.find((anOption) => anOption.id === "US") ?? null);

  const onChangeCountry = useCallback(
    (event: any, newValue: { label: string; id: string } | null) => {
      setCountrySelectedOption(newValue);
    },
    [setCountrySelectedOption]
  );
  const [zipCode, setZipCode] = useState<string>("");

  const disabledForm = useMemo(() => {
    return !countrySelectedOption?.id || !zipCode.length;
  }, [countrySelectedOption, zipCode]);

  const handleSearch = useCallback(() => {
    if (!disabledForm && !loading) {
      onSearch({ countryCode: countrySelectedOption!.id, zipCode });
      setZipCode("");
    }
  }, [onSearch, disabledForm, loading, countrySelectedOption, zipCode]);

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSearch();
    },
    [handleSearch]
  );

  const onChangeZipCode: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (event) => {
      setZipCode(event.target.value);
    },
    [setZipCode]
  );

  return (
    <Box
      component="form"
      noValidate
      onSubmit={onFormSubmit}
      sx={{
        "& > :not(style)": { m: 1, width: "100%" },
      }}
    >
      <Stack spacing={2} direction="row">
        <Autocomplete
          disablePortal
          id="country_select"
          isOptionEqualToValue={({ id: optionId }, { id: valueId }) => {
            return optionId === valueId;
          }}
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
        type="submit"
        onClick={handleSearch}
        loading={loading}
        disabled={disabledForm}
        loadingIndicator="Loading…"
        variant="outlined"
      >
        Search
      </LoadingButton>
      <Button onClick={onClear} disabled={clearDisabled}>
        Clear
      </Button>
    </Box>
  );
}
