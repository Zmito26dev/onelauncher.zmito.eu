import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './header.css'
import { noticeAlertIcon } from '../../assets/svgs'

const BannerLogo = <svg height="60" viewBox="0 0 848 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_96_2)">
<path d="M236 0H64C28.6538 0 0 28.6538 0 64V236C0 271.346 28.6538 300 64 300H236C271.346 300 300 271.346 300 236V64C300 28.6538 271.346 0 236 0Z" fill="white"/>
<path d="M148.136 104.895L116.275 121.353V94.978L153.833 74.3H176.832V222H148.136V104.895Z" fill="black"/>
<path d="M346.41 153.87V30.73L376.54 0.599988H470.86L500.99 30.73V153.87L470.86 184H376.54L346.41 153.87ZM451.996 153.608L465.358 140.246V44.354L451.996 30.992H395.404L382.042 44.354V140.246L395.404 153.608H451.996ZM532.481 0.599988H564.445L646.189 125.05H646.713V0.599988H681.035V184H649.071L567.327 59.812H566.803V184H532.481V0.599988ZM715.165 0.599988H847.737V30.73H750.797V77.104H847.737V106.71H750.797V153.87H847.737V184H715.165V0.599988Z" fill="white"/>
<path d="M345.37 231.4H358.698V288.73H392.998V300H345.37V231.4ZM422.512 231.4H434.664L459.752 300H446.228L440.642 284.81H416.534L410.948 300H397.424L422.512 231.4ZM437.702 273.834L428.588 247.766H428.392L419.572 273.834H437.702ZM464.745 288.24V231.4H478.073V283.634L483.071 288.632H502.279L507.277 283.634V231.4H520.605V288.24L508.845 300H476.505L464.745 288.24ZM533.364 231.4H545.32L575.896 277.95H576.092V231.4H588.93V300H576.974L546.398 253.548H546.202V300H533.364V231.4ZM600.716 288.73V242.67L611.986 231.4H645.502L656.576 242.474V252.96H643.248V247.374L638.642 242.768H619.042L614.044 247.766V283.634L619.042 288.632H638.642L643.248 284.026V278.44H656.576V288.926L645.502 300H611.986L600.716 288.73ZM665.913 231.4H679.241V260.114H708.249V231.4H721.577V300H708.249V271.482H679.241V300H665.913V231.4ZM734.341 231.4H783.929V242.67H747.669V260.016H781.087V271.09H747.669V288.73H783.929V300H734.341V231.4ZM847.672 277.264V300H834.344V280.302L828.464 273.736H807.1V300H793.772V231.4H836.794L847.28 241.984V262.76L840.616 269.522L847.672 277.264ZM807.1 262.76H830.718L834.148 259.33V246.002L830.718 242.572H807.1V262.76Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_96_2">
<rect width="848" height="300" fill="white"/>
</clipPath>
</defs>
</svg>

export default function Header() {
  const {t} = useTranslation();

  return (
    <>
      <header className='header'>
        <div className='header-content'>
          <NavLink to="/" className='banner-logo' onClick={() => window.scrollTo(0, 0)}>{BannerLogo}</NavLink>
          <h1 style={{display: "none"}}>ONE Launcher</h1>
          <nav className='header-links'>
            <NavLink to="/releases" className='header-link'>{t("header.releases")}</NavLink>
            <a className="header-link" target='_blank' href="https://docs.onelauncher.zmito.eu/">{t("header.devs")}</a>
          </nav>
        </div>
      </header>

      <a target="_blank" className="header-notice">
        <div className="notice-icon">{noticeAlertIcon}</div>
        <div className="notice-text"><p>{t("header.notice")}</p></div>
      </a>
    </>
  )
}