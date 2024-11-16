import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import "./manage-content.css"
import MC_Editor from '../../components/editor/editor';

export default function ManageContentPage() {
  const {t} = useTranslation();
  const [contentMode, setContentMode] = useState("update")

  const ModeButton = ({ mode, label }) => {
    return (
      <button className="mc-mode-button" disabled={contentMode === mode} onClick={() => setContentMode(mode)}>{label}</button>
    )
  }

  const UpdateMode = () => {
    const [isFileChosed, setIsFileChosed] = useState(false);
    const [fileContent, setFileContent] = useState();
    const fileInputRef = useRef(null);
    const fileUrlRef = useRef(null);
  
    const handleUrlSubmit = async (e) => {
      e.preventDefault();
      const fileUrl = fileUrlRef.current.value
      try {
        const response = await fetch(fileUrl);
        const data = await response.json()
        console.log(data)
        setIsFileChosed(true);
      } catch (error) {
        console.log("Invalid JSON url.")
      }
    };
  
    const handleFileSelect = async (e) => {
      const selectedFile = e.target.files[0];
  
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsedJson = JSON.parse(e.target.result);
            setFileContent(parsedJson);
            setIsFileChosed(true)
            console.log(parsedJson);
          } catch (error) {
            console.error('Error reading JSON:', error);
          }
        };
        reader.readAsText(selectedFile);
      }
    };
  
    const handleDragOver = (e) => {
      e.preventDefault();
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileSelect({ target: { files: e.dataTransfer.files } });
    };
  
    const ChoseFile = () => {
      return (
        <div className="mc-chose-file">
          <h2 style={{margin: "0 0 16px 0"}}>Import JSON file</h2>
          <label htmlFor="input-file" className="mc-file-input" onDragOver={handleDragOver} onDrop={handleDrop}>
            <input type="file" id="input-file" hidden ref={fileInputRef} onChange={handleFileSelect} />
            <p className="mc-file-input-text">Drag & drop or click here to select the JSON file.</p>
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <p style={{ letterSpacing: "-3px" }}>—————————————</p>
            <p>or</p>
            <p style={{ letterSpacing: "-3px" }}>—————————————</p>
          </div>
          <form onSubmit={handleUrlSubmit}>
            <input type="text" name="url-file" ref={fileUrlRef} className="mc-file-url" placeholder="Paste here the URL of the JSON you want to select." />
          </form>
        </div>
      );
    };
  
    return (
      <>
        {!isFileChosed ? <ChoseFile /> : <MC_Editor jsonData={fileContent}/>}
      </>
    );
  };

  const CreateMode = () => {
    return (
      <MC_Editor />
    )
  }

  return (
    <div className="mcont-page">
      <h2 className="mc-title">Manage Content</h2>

      <div className="mc-main-container">
        <div className="mc-mode-selector">
          <ModeButton mode="update" label="Update existing Content JSON"/>
          <ModeButton mode="create" label="Create new Content JSON"/>
        </div>
        <div className="mc-main">
          {contentMode === "update" ? <UpdateMode /> : contentMode === "create" ? <CreateMode /> : <></>}
        </div>
      </div>
    </div>
  )
}