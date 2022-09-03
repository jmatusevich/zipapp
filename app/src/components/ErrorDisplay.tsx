import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import { getZipCodeDetailsVars } from "../graphql/types/getZipCodeDetailsTypes";
export function ErrorDisplay({
  countryCode,
  zipCode,
  show = false,
}: Partial<getZipCodeDetailsVars> & { show: boolean }) {
  if (show) {
    return (
      <Box>
        <Alert severity="error" sx={{ width: "100%" }}>
          <AlertTitle>Error</AlertTitle>
          We couldn't find any results with country code{" "}
          <strong>"{countryCode}"</strong> and zip code{" "}
          <strong>"{zipCode}"</strong>
        </Alert>
      </Box>
    );
  }
  return null;
}
