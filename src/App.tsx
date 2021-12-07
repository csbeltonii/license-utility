import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DealerContainer from "./components/DealerContainer";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./utility/authConfig";
import NavBar from "./components/NavBar";
import AuditPage from "./components/AuditPage";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dealer/:accountNumber" element={<DealerContainer />} />
          <Route path="/audit" element={<AuditPage />} />
        </Routes>
      </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
