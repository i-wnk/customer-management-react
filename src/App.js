// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerList from "./pages/CustomerList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-list" element={<CustomerList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

