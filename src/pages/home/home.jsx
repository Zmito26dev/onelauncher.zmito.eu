import { useState } from "react"
import { windowsIcon } from "../../assets/svgs"
import { useTranslation } from 'react-i18next';
import "./home.css"
import mainImg from "../../assets/launcher/main.webp"
import activateContentImg from "../../assets/launcher/activate-content.webp"
import needUpdateImg from "../../assets/launcher/need-update.webp"
import libraryImg from "../../assets/launcher/library.webp"

export default function HomePage() {
  const {t} = useTranslation();

  return (
    <div className="home-page">
      <div className="h-main">
        <div className="h-title">
          <h2 className="h-title-text">{t("home.title1")}</h2>
          <h2 className="h-title-text">{t("home.title2")}</h2>
        </div>
        <a href="" className="h-dl-windows">
          {windowsIcon}
          <p>{t("home.dlButton")}</p>
        </a>
        <img src={mainImg} alt="Launcher Image" className="h-main-img" />
      </div>

      <h2 className="h-why-text">{t("home.showcase.title")}</h2>
      <div className="h-section">
        <div className="h-section-right">  
          <h3>{t("home.showcase.activate-content.title")}</h3>
          <p>{t("home.showcase.activate-content.text")}</p>
        </div>
        <img src={activateContentImg} alt="" />
      </div>

      <div className="h-section">
      <img src={needUpdateImg} alt="" />
        <div className="h-section-left">  
          <h3>{t("home.showcase.updates.title")}</h3>
          <p>{t("home.showcase.updates.text")}</p>
        </div>
      </div>

      <div className="h-section">
        <div className="h-section-right">  
          <h3>{t("home.showcase.all-in-one.title")}</h3>
          <p>{t("home.showcase.all-in-one.text")}</p>
        </div>
        <img src={libraryImg} alt="" />
      </div>
    </div>
  )
}