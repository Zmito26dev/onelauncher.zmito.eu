import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/home/home';
import DownloadsPage from './pages/downloads/downloads';
import DevsPage from './pages/devs/devs';
import NotFoundPage from './pages/404/404';
import "./i18n"
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <div className="web">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/releases" element={<DownloadsPage/>}/>
        <Route path="/developers" element={<DevsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer/>
    </div>
  </BrowserRouter>
)