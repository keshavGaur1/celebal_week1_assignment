import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./FormComponent";
import SuccessDetails from "./SuccessDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/success" element={<SuccessDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
