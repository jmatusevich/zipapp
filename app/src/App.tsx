import { Container } from "@mui/system";
import "./App.css";
import { useZipCodeDetailsQuery } from "./graphql/queries/GET_ZIP_CODE_DETAILS";

function App() {
  const { loading, data } = useZipCodeDetailsQuery({
    countryCode: "US",
    zipCode: "90210",
  });
  return (
    <div className="App">
      <Container maxWidth="sm">
        {!loading ? data?.getZipCodeDetails.country : "Loading"}
      </Container>
    </div>
  );
}

export default App;
