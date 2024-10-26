import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { createdByZ } from '../../assets/svgs'
import './footer.css'

export default function Footer() {
  const {t} = useTranslation();

  return (
    <footer className='footer'>
      <div className='ft-links'>
        <Link to="/" className="ft-link">{t("footer.links.home")}</Link>
        <p className="ft-link-separator">|</p>
        <Link to="/downloads" className="ft-link">{t("footer.links.dl")}</Link>
        <p className="ft-link-separator">|</p>
        <Link to="/developers" className="ft-link">{t("footer.links.devs")}</Link>
      </div>
      <a className="ft-createdbyz" href="https://links.zmito.eu" target='_blank'>
        {createdByZ}
      </a>
    </footer>
  )
}