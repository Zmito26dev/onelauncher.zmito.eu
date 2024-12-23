import { useState, useRef, useEffect } from "react"
import { infoIcon, downloadIcon, copyIcon } from "../../assets/svgs"
import { MinecraftVersions, FabricVersions, QuiltVersions, ForgeVersions, NeoForgeVersions } from "./components/versions-loader"
import LoaderSelector from "./components/loader-selector/loader-selector"
import CheckBox from "../checkbox/checkbox"
import "./editor.css"

export default function MC_Editor({jsonData}) {
  const [showInfo, setShowInfo] = useState(false)
  const [maintenanceMode, setMaintenaceMode] = useState(false)
  const selectedLoaderState = useState("fabric")
  const [selectedLoader, setSelectedLoader] = selectedLoaderState
  const [minecraftVersion, setMinecraftVersion] = useState("1.21.4")

  const nameRef = useRef(null)
  const idRef = useRef(null)
  const bgRef = useRef(null)
  const bannerRef = useRef(null)
  const titleRef = useRef(null)
  const serverIpRef = useRef(null)
  const loaderVerRef = useRef(null)
  const updateFileRef = useRef(null)
  const keepedFilesRef = useRef(null)
  const updateVerRef = useRef(null)

  useEffect(() => {
    if (jsonData) {
      nameRef.current.value = jsonData.name || '';
      idRef.current.value = jsonData.id || '';
      setMaintenaceMode(jsonData.maintenance);
      bannerRef.current.value = jsonData.bannerURL || '';
      bgRef.current.value = jsonData.bgURL || '';
      titleRef.current.value = jsonData.titleURL || '';
      setSelectedLoader(jsonData.mcLoader);
      setMinecraftVersion(jsonData.mcVer);
      serverIpRef.current.value = jsonData.mcServerIP || '';
      updateVerRef.current.value = jsonData.updateVer || '';
      updateFileRef.current.value = jsonData.updateFileUrl || '';
      keepedFilesRef.current.value = jsonData.updateKeepedFiles || '';
    }
  }, [jsonData]);

  function handleNameChange() {
    const name = nameRef.current.value;
    const id = name.toLowerCase().replace(/ /g, "-").replace(/\./g, "_").replace(/[^a-z0-9_-]/g, "");
    idRef.current.value = id;
  }

  function generateJSON() {
    const keepedFiles = keepedFilesRef.current ? keepedFilesRef.current.value.split(',') : [];

    const iJSON = {
      "id": idRef.current.value,
      "name": nameRef.current.value,
      "maintenance": maintenanceMode,
      "bannerURL": bannerRef.current.value,
      "bgURL": bgRef.current.value,
      "titleURL": titleRef.current.value,
      "mcVer": minecraftVersion,
      "mcLoader": selectedLoader,
      "mcLoaderVer": loaderVerRef.current ? loaderVerRef.current.value : "",
      "mcServerIP": serverIpRef.current.value,
      "updateVer": parseFloat(updateVerRef.current.value),
      "updateFileUrl": updateFileRef.current ? updateFileRef.current.value : "",
      "updateKeepedFiles": keepedFiles
    }

    const filterEmptyProperties = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value !== "")
      );
    };
    const JSON = filterEmptyProperties(iJSON);

    console.log("[MCE] Generated JSON:", JSON)
    return JSON
  }

  function handleDownloadJSON() {
    const jsonContent = JSON.stringify(generateJSON(), null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `${idRef.current.value}_update.json`;
    a.click();
  
    URL.revokeObjectURL(url);
  }

  function handleCopyJSON() {
    navigator.clipboard.writeText(JSON.stringify(generateJSON(), null, 2));
  }

  const MoreInfoLabel = ({ label }) => {
    return (
      <>
        {showInfo &&
          <div className="more-inf-label">
            {infoIcon}
            <p>{label}</p>
          </div>
        }
      </>
    )
  }

  return (
    <div className="mc-main-editor">
      <button className="mc-me-toggle-info" onClick={() => setShowInfo(!showInfo)}>Show Info</button>
      <div className="mc-me-section">
          <h3 className="mc-me-title" >Display name<span style={{color: "#ff6e6e"}}>*</span></h3>
          <input type="text" className="text-input" name="name" onChange={handleNameChange} ref={nameRef} placeholder="Display name for the Content"/>
          <MoreInfoLabel label="Display name of the Content."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">ID<span style={{color: "#ff6e6e"}}>*</span></h3>
          <input type="text" className="text-input" name="name" ref={idRef} placeholder="ID of the Content Instance"/>
          <MoreInfoLabel label="ID of the Content Instance, only lowercase letters, numbers or hyphens. Cannot be changed in the future."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">Background (URL)<span style={{color: "#ff6e6e"}}>*</span></h3>
          <input type="text" className="text-input" name="name" ref={bgRef} placeholder="URL of the image or video"/>
          <MoreInfoLabel label="URL of the image or video to be used as background on the Content page."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">Banner Image (URL)<span style={{color: "#ff6e6e"}}>*</span></h3>
          <input type="text" className="text-input" name="name" ref={bannerRef} placeholder="URL of the image"/>
          <MoreInfoLabel label="URL of the image to be used as the Content banner on the main page."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">Title Image (URL)</h3>
          <input type="text" className="text-input" name="name" ref={titleRef} placeholder="URL of the image"/>
          <MoreInfoLabel label="URL of the image to be used as the Content title. If none is provided, the Content name will be used as the title."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">Maintenance Mode</h3>
          <CheckBox label="Enable maintenace mode" isCheked={maintenanceMode} onChange={() => setMaintenaceMode(!maintenanceMode)}/>
          <MoreInfoLabel label="Maintenance mode will disable the ability to play the Content until you disable it."/>
      </div>
      <div className="mc-me-section">
          <h3 className="mc-me-title">Minecraft Server IP</h3>
          <input type="text" className="text-input" name="name" ref={serverIpRef} placeholder="Server IP"/>
          <MoreInfoLabel label="The public IP address of the Minecraft server will be used to indicate its online status and player count."/>
      </div>
      <div className="mc-me-section">
        <h3 className="mc-me-title">Loader<span style={{color: "#ff6e6e"}}>*</span></h3>
        <LoaderSelector selectedLoaderState={selectedLoaderState}/>
      </div>
      <div className="mc-me-section">
        <h3 className="mc-me-title">Minecraft Version<span style={{color: "#ff6e6e"}}>*</span></h3>
        <select name="" className="select-input" onChange={(e) => {setMinecraftVersion(e.target.value)}}>
          {jsonData && <option value={jsonData.mcVer}>{jsonData.mcVer}</option>}
          {selectedLoader === "snapshot" ? <MinecraftVersions filterType="snapshot"/> : <MinecraftVersions filterType="release"/>}
        </select>
      </div>
      {!(selectedLoader === "vanilla" || selectedLoader === "snapshot") && 
        <>
          <div className="mc-me-section">
            <h3 className="mc-me-title">Loader Version<span style={{color: "#ff6e6e"}}>*</span></h3>
            <select name="" className="select-input" ref={loaderVerRef}>
              {jsonData && <option value={jsonData.mcLoaderVer}>{jsonData.mcLoaderVer}</option>}
              {
                selectedLoader === "fabric" ? <FabricVersions minecraftVersion={minecraftVersion}/> :
                selectedLoader === "quilt" ? <QuiltVersions /> :
                selectedLoader === "forge" ? <ForgeVersions minecraftVersion={minecraftVersion}/> :
                selectedLoader === "neoforge" ? <NeoForgeVersions minecraftVersion={minecraftVersion}/> :
                <option value={undefined}>Not available</option>
              }
            </select>
          </div>
          <div className="mc-me-section">
              <h3 className="mc-me-title">Update file (URL)<span style={{color: "#ff6e6e"}}>*</span></h3>
              <input type="text" className="text-input" name="name" ref={updateFileRef} placeholder="URL of the .zip file"/>
              <MoreInfoLabel label="URL of the .zip file containing all the necessary files (mods, settings, shaders) for your Content."/>
          </div>
          <div className="mc-me-section">
              <h3 className="mc-me-title">Keeped files when updating<span style={{color: "#ff6e6e"}}>*</span></h3>
              <input type="text" className="text-input" name="name" ref={keepedFilesRef} placeholder="List of keeped files"/>
              <MoreInfoLabel label='Enter the elements in quotes and separated by commas. (Ex.: "versions", "saves", "screenshots")'/>
          </div>
        </>
      }
      <div className="mc-me-section">
        <h3 className="mc-me-title">Update Version<span style={{color: "#ff6e6e"}}>*</span></h3>
        <input type="number" min="1" step="0.1" className="number-input" name="name" ref={updateVerRef} placeholder="Number of the new update version"/>
        <MoreInfoLabel label='Version number of the new update. Must be higher than the preceding version.'/>
      </div>
      <div className="mc-me-options">
        <span className="mc-me-separator"/>
        <div style={{display: "flex", gap: "10px"}}>
          <button className="mc-me-option" onClick={handleDownloadJSON}>{downloadIcon}<p>Download JSON File</p></button>
          <button className="mc-me-option" onClick={handleCopyJSON}>{copyIcon}<p>Copy JSON to the clipboard</p></button>
        </div>
      </div>
    </div>
  )
}