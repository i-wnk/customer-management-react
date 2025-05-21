// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CustomerList from "./pages/CustomerList";
import CustomerEntry from "./pages/CustomerEntry";
import CustomerEdit from "./pages/CustomerEdit";
import CompanyList from "./components/CompanyList";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer-entry" element={<CustomerEntry />} />
        <Route path="/customer-edit/:id" element={<CustomerEdit />} /> 
        <Route path="/company-list" element={<CompanyList />} />
        <Route path="/customer-entry" element={<CustomerEntry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
