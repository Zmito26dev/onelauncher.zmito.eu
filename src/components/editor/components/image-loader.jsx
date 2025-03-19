import { useState, useRef, useEffect } from "react";
import { removeIcon } from "../../../assets/svgs";

export default function ImageLoader({ name, imageState }) {
  const [isImgSelected, setIsImgSelected] = useState(false);
  const [imageUrl, setImageUrl] = imageState;
  const fileInputRef = useRef(null);
  const clientId = "d6703ec2472b7a0"; // Reemplaza con tu Client ID de Imgur

  useEffect(() => {
    if (imageUrl) {
      setIsImgSelected(true)
    } else {
      setIsImgSelected(false)
    }
    
  }, [imageUrl])

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsImgSelected(true);
      await uploadImageToImgur(selectedFile);
    }
  };

  const uploadImageToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.data.link);
        console.log("Imagen subida con éxito:", data);
      } else {
        console.error("Error al subir la imagen:", response.statusText);
        setIsImgSelected(false);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setIsImgSelected(false);
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

  return (
    <div className="mc-me-imgloader">
      {!isImgSelected && (
        <label htmlFor={`${name}-file`} className="mc-me-imginput" onDragOver={handleDragOver} onDrop={handleDrop}>
          <input type="file" id={`${name}-file`} hidden ref={fileInputRef} onChange={handleFileSelect} />
          <p className="mc-me-imginput-text">
            Drag & drop or<br /> click here to upload<br /> an image.
          </p>
        </label>
      )}
      {isImgSelected && !imageUrl && (
        <div className="mc-me-imginput" style={{cursor: "default"}}>
         <span className="loader" />
        </div>
      )}
      {imageUrl && (
        <div className="mc-me-imginput">
          {removeIcon}
          <img className={name == "title" ? "mc-me-title" : "mc-me-img"} src={imageUrl} alt="" />
        </div>
      )}
    </div>
  );
}