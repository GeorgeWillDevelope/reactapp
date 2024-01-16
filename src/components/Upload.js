import { useEffect, useRef, useState} from 'react';
import React from "react";
import axios from 'axios';
import './Popup.css';

function  Upload(props){
  const popupRef = useRef();
  
  const handleClickOutside = (event) => {
    
    if (popupRef.current === event.target) {
      props.setTrigger(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props.setTrigger]);
  
  const [files,setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event)=>{
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFiles(droppedFiles);
  };

  const handleFileUpload = async () => {
    if (files) {
      // Filter allowed file types
      const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
                            'application/msword', // Word
                            'application/pdf', // PDF
                            'text/plain', // Text
                            'image/jpeg', 'image/png']; // Pictures
  
      const invalidFiles = Array.from(files).filter(file => !allowedTypes.includes(file.type));
  
      if (invalidFiles.length > 0) {
        console.error('Invalid file types. Only Excel, Word, PDF, Text, and Pictures are allowed.');
        return;
      }
  
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
  
      try {
        const response = await axios.post('https://localhost:7013/api/Home/UploadFiles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.ok) {
          console.log('Files uploaded successfully');
        } else {
          console.error('Failed to upload files');
        }
      } catch (error) {
        console.error('Error during file upload', error);
      }
    }
  };

  return (props.trigger) ? (
    <div className="popup" ref={popupRef}>
      <div className="popup-inner">
        <>
          {!files && (
            <div
              className='dropzone'
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h1>Drag and Drop Files to Upload</h1>
              <h1>Or</h1>
              <input
                type="file"
                multiple
                onChange={(event) => setFiles(event.target.files)}
                hidden
                ref={inputRef}
              />
              <button onClick={() => inputRef.current.click()}>Select Files</button>
            </div>
          )}
        </>
        <div className="popup-btn">
          <button className="upload-btn" onClick={handleFileUpload}>Upload</button>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
      </div>
    </div>
  ) : "";
}

export default Upload;