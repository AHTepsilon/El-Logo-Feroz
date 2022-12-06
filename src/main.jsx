import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import FirstPage from './pages/FirstPage'
import SecondPage from './pages/SecondPage'
import ThirdPage from './pages/ThirdPage'
import LogInPage from './pages/LogInPage'
import DataGatheringPage from './pages/DataGatheringPage'
import AdminPage from './pages/AdminPage'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<LogInPage />}></Route>
      <Route path="/FirstPage" element={<FirstPage />}></Route>
        <Route path="/SecondPage" element={<SecondPage />}></Route>
        <Route path="/ThirdPage" element={<ThirdPage />}></Route>
        <Route path="/DataGatheringPage" element={<DataGatheringPage />}></Route>
        <Route path="/Admin" element={<AdminPage />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
)
