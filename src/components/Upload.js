import { useEffect, useRef, useState} from 'react';
import React from "react";
import './Popup.css';

function  Upload(props){
    const popupRef = useRef();
    const [files,setfiles] = useState(null);

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

    return(props.trigger) ? (
        <div className="popup" ref={popupRef}>
            <div className="popup-inner">
                <>
                    {!files&&(
                        <div className='dropzone'>
                            <h1>Drag and Drob Files to Upload</h1>
                            <h1>Or</h1>
                            <button>Select Files</button>
                        </div>
                    )}
                </>
                <div className="popup-btn">
                    <button className="upload-btn" onClick={() => props.setTrigger(false)}>Upload</button>
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
                </div>
            </div>
        </div>
    ) : "";
}

export default Upload