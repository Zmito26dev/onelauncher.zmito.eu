import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { linkIcon, linuxIcon, macOSIcon, windowsIcon } from "../../assets/svgs";
import Markdown from "react-markdown";
import "./downloads.css"

export default function DownloadsPage() {
  const {t} = useTranslation();
  const [releases, setReleases] = useState([])

  useEffect(() => {
    const fetchReleases = async () => {
      const response = await fetch("https://api.github.com/repos/Zmito26dev/onelauncher.zmito.eu/releases");
      const data = await response.json();
      setReleases(data);
      console.log(data)
    };

    fetchReleases();
  }, [])

  const ChangelogArticle = ({url, title, body}) => {
    return (
      <article className="dl-changelog-article">
        <a href={url} target="_blank" className="dl-changelog-article-href">
          <h2>{title}</h2>
          {linkIcon}
        </a>
        <Markdown className="dl-changelog">{body}</Markdown>
      </article>
    )
  }

  return (
    <div className="dl-main">
      {releases.length > 0 &&
        <>
          <div className="dl-latest">
            <h2 className="dl-latest-title">{t("releases.title") + releases[0].tag_name}</h2>
            <div className="dl-buttons">
              <a href="https://github.com/Zmito26dev/onelauncher.zmito.eu/releases/latest/download/onelauncher-installer.exe" className="dl-windows">
                {windowsIcon}
                <p>Download for Windows</p>
              </a>
              <a className="dl-disabled" title="Available soon">
                {linuxIcon}
                <p>Download for Linux</p>
              </a>
              <a className="dl-disabled" title="Available soon">
                {macOSIcon}
                <p>Download for MacOS</p>
              </a>
            </div>
          </div>

          <div className="dl-changelogs-container">
            <h2 className="dl-changelogs-title">{t("releases.changelogs")}</h2>
            <div className="dl-changelogs">
              {releases.map((release) => (
                <ChangelogArticle
                  key={release.id}
                  url={release.html_url}
                  title={release.name}
                  body={release.body}
                />
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}