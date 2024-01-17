import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ListAll.css";
import Share from "./Share"


const ThumbnailList = () => {
    const [thumbnailList, setThumbnailList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7013/api/Home/ListAll');
          setThumbnailList(response.data);
        } catch (error) {
          console.error('Error fetching thumbnail list:', error);
        }
      };
  
      fetchData();
    }, []);  // Empty dependency array ensures the effect runs only once when the component mounts
  
    // Function to get the file type icon based on the file type
const getFileTypeIcon = (fileType) => {
  switch (fileType.toLowerCase()) {
    case 'text/plain':
      return '/texticon.png';
    case 'application/pdf':
      return '/pdf-icon.png';
    case 'word':
      return '/word-icon.png';
    case 'excel':
      return '/excel-icon.png';
    default:
      return '/picture-icon.png'; // Provide a default icon for unknown file types
  }
};

const informationText = {
color:'#9fa5e4',
fontSize:'18px',
paddingRight:'20px'
};
const handleDownload = async () => {
  // Check if there are any selected items
  if (selectedIds.length === 0) {
    alert('Please select at least one file to download.');
    return;
  }


  // Loop through the selected file IDs
  for (const id of selectedIds) {
      try {
          const response = await axios.get(`https://localhost:7013/api/Home/DownloadFile/${id}`, {
              responseType: 'blob', // Ensure responseType is set to 'blob'
          });

          const selectedItem = thumbnailList.find(thumbnail => thumbnail.result.id === id);

          let filename = '';

          if (selectedItem) {
               filename = selectedItem.result.fileName;
          }

        // Create a Blob object from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a link element and trigger a click to download the file
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
          link.download = filename !== '' ? filename : `downloaded-file-${Date.now()}`;
        link.click();
      } catch (error) {
      console.error('Error fetching file URL:', error);
    }
  }

  // Reset the selectedIds array or handle other actions if needed
    setSelectedIds([]);
    window.location.reload();
};

const handleDoubleClick = (id) => {
  const selectedElement = document.querySelector(`.thumbnail-item[data-index="${id}"]`);
    const downloadButton = document.querySelector(`button.download-button`);

  // Change the style of the selected element
  if (!selectedIds.includes(id)) {
    selectedElement.style.border = '5px solid rgb(127,255,0)';
    downloadButton.style.backgroundColor = '#9fa5e4';
    setSelectedIds(prevIds => [...prevIds, id]);
  }else {
    setSelectedIds(prevIds => prevIds.filter(selectedId => selectedId !== id));
    selectedElement.style.border = '5px solid rgba(255, 255, 255, 0.8)';
    if (selectedIds.length === 1) {
      downloadButton.style.backgroundColor = 'rgb(197, 197, 197)';
    }
  }

  // Handle other actions if needed
  console.log('Double click on item with id:', id);
}

const [sharePopup, setSharePopup] = useState({
  isOpen: false,
  selectedId: null,
});

const setOpenAndId = (isOpen, selectedId) => {
  setSharePopup({
    isOpen: isOpen,
    selectedId: isOpen ? selectedId : null,
  });
};

  return (
    <div>
      <div className='search-download-bar'>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>

        <div>
          <text style={informationText}>*Double click to select a file </text>
          <button className="download-button" onClick={handleDownload}>Download</button>
        </div>
      </div>
      <div className="thumbnail-list-container">
            {thumbnailList.map((thumbnail) => (
            <div data-index={thumbnail.result.id}
             className="thumbnail-item"
             onDoubleClick={() => handleDoubleClick(thumbnail.result.id)}
             >
              {/* Use the image URL directly */}
              <img src={thumbnail.result.thumbnailUrl} alt={thumbnail.result.fileName} />
              <div>
                <p>File Name: {thumbnail.result.fileName}</p>
                <p>Date of Upload: {new Date(thumbnail.result.dateOfUpload).toLocaleString()}</p>
                <p>File Type: {thumbnail.result.fileType}</p>
                <p>Number of Downloads: {thumbnail.result.numberOfDownloads}</p>
                <button className="share-button" onClick={() => setOpenAndId(true, thumbnail.result.id)}>
                      <img src="/share-icon.png" alt="Share"/>
                </button>
              </div>
              <img
                    className="file-type-icon"
                    src={getFileTypeIcon(thumbnail.result.fileType)}
                    alt={`File Type: ${thumbnail.result.fileType}`}
                  />
            </div>
            ))}
      </div>
      <Share
        trigger={sharePopup.isOpen}
        setTrigger={(isOpen) => setOpenAndId(isOpen, sharePopup.selectedId)}
        selectedId={sharePopup.selectedId}
      />
    </div>
  );
};

export default ThumbnailList;
