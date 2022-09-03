import { useZipCodeDetailsQuery } from "../graphql/queries/GET_ZIP_CODE_DETAILS";

import { Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";

import { ZipCodeSearchForm } from "../components/ZipCodeSearchForm";
import { getZipCodeDetailsVars } from "../graphql/types/getZipCodeDetailsTypes";
import { ZipCodeDetailsList } from "../components/ZipCodeDetailsList";
import { useSearchHistory } from "../helpers/useSearchHistory";
import { ErrorDisplay } from "../components/ErrorDisplay";
function ZipCodeQueryView() {
  const [findZipCode, { loading, data }] = useZipCodeDetailsQuery();
  const [history, addToHistory, clearHistory] = useSearchHistory();
  const [showErrorArgs, setShowErrorArgs] =
    useState<getZipCodeDetailsVars | null>(null);
  const [lastSearchArgs, setLastSearchArgs] =
    useState<getZipCodeDetailsVars | null>(null);
  const onSearch = useCallback(
    (args: getZipCodeDetailsVars) => {
      setLastSearchArgs(args);
      findZipCode({ variables: args });
    },
    [findZipCode]
  );

  useEffect(() => {
    if (data?.getZipCodeDetails) {
      setShowErrorArgs(null);
      addToHistory(data.getZipCodeDetails);
    } else {
      setShowErrorArgs(lastSearchArgs);
    }
  }, [data, lastSearchArgs, addToHistory]);

  const onClear = useCallback(() => {
    setShowErrorArgs(null);
    clearHistory();
  }, [clearHistory, setShowErrorArgs]);

  return (
    <div>
      <Typography variant="h2" component="h1">
        Zip Code Finder
      </Typography>
      <ZipCodeSearchForm
        onSearch={onSearch}
        onClear={onClear}
        clearDisabled={!history.length}
        loading={loading}
      />
      <ErrorDisplay show={!loading && !!showErrorArgs} {...showErrorArgs} />
      <ZipCodeDetailsList list={history} />
    </div>
  );
}

export default ZipCodeQueryView;
