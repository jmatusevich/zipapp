import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import "./App.css";
import ZipCodeQueryView from "./views/ZipCodeQueryView";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <ZipCodeQueryView />
      </Container>
    </div>
  );
}

export default App;
