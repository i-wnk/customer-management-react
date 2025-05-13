// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerList from "./pages/CustomerList";
import CustomerEntry from "./pages/CustomerEntry";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer-entry" element={<CustomerEntry />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

