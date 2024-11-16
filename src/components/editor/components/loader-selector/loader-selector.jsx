import "./loader-selector.css"

export default function LoaderSelector({selectedLoaderState}) {
  const LoaderButton = ({ label, loader, selectedLoaderState }) => {
    const [selectedLoader, setSelectedLoader] = selectedLoaderState

    return (
      <button className="loader-selector-button" disabled={loader === selectedLoader} onClick={() => setSelectedLoader(loader)}>{label}</button>
    )
  }
  return (
    <div className="loader-selector">
      <LoaderButton label="Fabric" loader="fabric" selectedLoaderState={selectedLoaderState}/>
      <LoaderButton label="Quilt" loader="quilt" selectedLoaderState={selectedLoaderState}/>
      <LoaderButton label="Forge" loader="forge" selectedLoaderState={selectedLoaderState}/>
      <LoaderButton label="NeoForge" loader="neoforge" selectedLoaderState={selectedLoaderState}/>
      <LoaderButton label="Vanilla" loader="vanilla" selectedLoaderState={selectedLoaderState}/>
      <LoaderButton label="Snapshot" loader="snapshot" selectedLoaderState={selectedLoaderState}/>
    </div>
  )
}