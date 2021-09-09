import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DealerContainer from "./components/DealerContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dealer/:accountnumber" element={<DealerContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
