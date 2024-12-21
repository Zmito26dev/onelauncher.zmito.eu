import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./devs.css"

export default function DevsPage() {
  const {t} = useTranslation();

  useEffect(() => {
    document.title = "ONE Launcher — For developers";
  }, []);

  return (
    <div className="devs-main">
      <h2 className="devs-title">More information available soon.</h2>
    </div>
  )
}