import { useEffect, useRef, useState} from 'react';
import React from "react";
import axios from 'axios';
import './Popup.css';

function  Share(props){
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
  
    const labelStyle = {
        fontSize:'18px'
    };
    const dropdownStyle = {
            height: '48px', /* Set your desired height */
            borderRadius: '5px', /* Set your desired border-radius for rounded corners */
            fontSize: '16px', /* Set your desired font size */
            padding: '5px', /* Add padding for better appearance */
    };
    const shareForm = {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    };

    
    const { trigger, setTrigger, selectedId } = props;
    const [duration, setDuration] = useState('');
    const [durationUnit, setDurationUnit] = useState('minutes');
    const [generatedUrl, setGeneratedUrl] = useState('');
  
    const convertToMinutes = () => {
        switch (durationUnit) {
          case 'minutes':
            return duration;
          case 'hours':
            return duration * 60;
          case 'days':
            return duration * 24 * 60;
          default:
            return 0;
        }
      };
    
      const generateDownloadUrl = async () => {
        if (!duration || isNaN(duration) || duration <= 0) {
          alert('Please enter a valid duration.');
          return;
        }
        try {
          const response = await axios.post('https://localhost:7013/api/Home/ShareUrl', {
                  id: selectedId,
                  minutes: convertToMinutes(),
          });
    
          // Set the generated URL
          setGeneratedUrl(response.data);
        } catch (error) {
          console.error('Error generating URL:', error);
        }
      };

      const handleCopyLink = () => {
        const urlElement = document.createElement('textarea');
        urlElement.value = generatedUrl;
        document.body.appendChild(urlElement);
        urlElement.select();
        document.execCommand('copy');
        document.body.removeChild(urlElement);
      };
    
  
      return trigger ? (
        <div className="popup" ref={popupRef}>
          <div className="popup-inner">
            <h1>Generate Download URL</h1>
            <div style={shareForm}>
              <label style={labelStyle} htmlFor="duration">Duration:</label>
              <input
                type="number"
                id="duration"
                min="1"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <select
                style={dropdownStyle}
                id="durationUnit"
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
                  {generatedUrl && (
                      <div>
                          <p>Generated URL:</p>
                          <a href={generatedUrl} target="_blank" rel="noopener noreferrer">
                              {generatedUrl.substring(0, 36)}
                          </a>
                          <button onClick={handleCopyLink}>Copy Link</button>
                      </div>
                  )}

            <div className="popup-btn">
              <button className="share-btn" onClick={generateDownloadUrl}>Generate</button>
              <button className="close-btn" onClick={() => setTrigger(false)}>Close</button>
            </div>
          </div>
        </div>
      ) : null;
    }

export default Share;