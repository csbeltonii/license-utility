import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dealer from "./components/Dealer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/dealer/:accountNumber" element={<Dealer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
