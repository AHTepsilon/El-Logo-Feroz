import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import FirstPage from './pages/FirstPage'
import SecondPage from './pages/SecondPage'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />}></Route>
        <Route path="/SecondPage" element={<SecondPage />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
