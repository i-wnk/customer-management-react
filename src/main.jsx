// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import CompanyList from './CompanyList'; // 👈 さっき作ったやつ
import './index.css'; // CSSあれば読み込んでOK

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CompanyList />
  </React.StrictMode>
);
