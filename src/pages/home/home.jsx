import { useState, useEffect } from "react"
import { windowsIcon } from "../../assets/svgs"
import { useTranslation } from 'react-i18next';
import "./home.css"
import mainImg from "../../assets/launcher/main.webp"
import activateContentImg from "../../assets/launcher/activate-content.webp"
import needUpdateImg from "../../assets/launcher/need-update.webp"
import msaAuthImg from "../../assets/launcher/msa-auth.webp"
import loadersImg from "../../assets/launcher/loaders.webp"
import libraryImg from "../../assets/launcher/library.webp"

export default function HomePage() {
  const {t} = useTranslation();

  useEffect(() => {
    document.title = "ONE Launcher — Home";
  }, []);

  return (
    <div className="home-page">
      <div className="h-main">
        <div className="h-title">
          <h2 className="h-title-text">{t("home.title1")}</h2>
          <h2 className="h-title-text">{t("home.title2")}</h2>
        </div>
        <a href="https://github.com/Zmito26dev/onelauncher.zmito.eu/releases/latest/download/onelauncher-installer.exe" className="h-dl-windows">
          {windowsIcon}
          <p>{t("home.dlButton")}</p>
        </a>
        <img src={mainImg} alt="Launcher Image" className="h-main-img" />
      </div>

      <h2 className="h-why-text">{t("home.showcase.title")}</h2>
      <div className="h-sections">
        <div className="h-section">
          <div className="h-section-text">  
            <h3>{t("home.showcase.activate-content.title")}</h3>
            <p>{t("home.showcase.activate-content.text")}</p>
          </div>
          <img src={activateContentImg} alt="" />
        </div>

        <div className="h-section h-section-left">
          <div className="h-section-text">  
            <h3>{t("home.showcase.updates.title")}</h3>
            <p>{t("home.showcase.updates.text")}</p>
          </div>
          <img src={needUpdateImg} alt="" />
        </div>

        <div className="h-section">
          <div className="h-section-text">  
            <h3>{t("home.showcase.msaauth.title")}</h3>
            <p>{t("home.showcase.msaauth.text")}</p>
          </div>
          <img src={msaAuthImg} alt="" />
        </div>

        <div className="h-section h-section-left">
          <div className="h-section-text">  
            <h3>{t("home.showcase.loaders.title")}</h3>
            <p>{t("home.showcase.loaders.text")}</p>
          </div>
          <img src={loadersImg} alt="" />
        </div>

        <div className="h-section">
          <div className="h-section-text">  
            <h3>{t("home.showcase.all-in-one.title")}</h3>
            <p>{t("home.showcase.all-in-one.text")}</p>
          </div>
          <img src={libraryImg} alt="" />
        </div>
      </div>

    </div>
  )
}