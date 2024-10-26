import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/home/home';
import "./i18n"
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="web">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/downloads" element={<div>Downloads page</div>}/>
        <Route path="/developers" element={<div>Developers page</div>}/>
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>
)