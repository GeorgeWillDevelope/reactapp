import React, {  useState, } from 'react';
import Upload from './components/Upload';
import Login from './components/Login';
import "./App.css";


function App(){

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(16, 16, 255)',
        color: 'white',
        padding: '10px'
    };

    const contentStyle = {
        backgroundImage: 'url("path/to/background/image.jpg")',
        backgroundSize: 'cover',
        minHeight: 'calc(100vh - 60px)', // Adjust for navbar height
        padding: '20px'
    };

    const [uploadPopup, setUploadPopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);

  return (
    <div>
      <main>
        <div style={navbarStyle}>
          <div>
            {/* Add your tools/buttons here on the left */}
            <button>Library</button>
            <button onClick={() => setUploadPopup(true)}>Upload</button>
            {/* Add more tools/buttons as needed */}
          </div>
          <div>
            {/* Add login component or button on the right */}
            <button onClick={() => setLoginPopup(true)}>Login</button>
          </div>
        </div>
        <div style={contentStyle}>
          <h1>Welcome to DocNest</h1>
          <p>Your document management solution.</p>
          {/* Add any additional content or components as needed */}
        </div>
        <Upload trigger={uploadPopup} setTrigger={setUploadPopup}>
        </Upload>
        <Login trigger={loginPopup} setTrigger={setLoginPopup}>
        </Login>
      </main>
    </div>
  );
}

export default App;