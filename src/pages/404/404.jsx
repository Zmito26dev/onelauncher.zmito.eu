import { useState } from "react"
import "./404.css"

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h2 className="nfp-title">404</h2>
      <p className="nfp-text">Page not found</p>
    </div>
  )
}