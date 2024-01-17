import React, {  useState, } from 'react';
import Upload from './components/Upload';
import ListAll from './components/ListAll';
import Login from './components/Login';
import "./App.css";


function App(){

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#9fa5e4',
        color: 'white',
        padding: '10px'
    };

    const contentStyle = {
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("/docnest.png")',
      backgroundSize: '80%', // Reduce image size by 10%
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column', // Display components in a column
      justifyContent: 'flex-start', // Align components to the top
      alignItems: 'flex-start', // Align components to the left
      padding: '20px', // Add padding to the content
    };
    
    const headerStyle = {
      color: '#a1e3ff', // Baby blue color
      fontSize: '48px',
      textShadow: '2px 2px 4px #9fa5e4', // Darker blue contour
    };
    
    const paragraphStyle = {
      fontSize: '24px',
      color: '#a1e3ff', // Baby blue color
    };

    const [uploadPopup, setUploadPopup] = useState(false);
    const [loginPopup, setLoginPopup] = useState(false);
    const [listAllPopup, setListAllPopup] = useState(false);

  return (
    <div>
      <main>
        <div style={navbarStyle}>
          <div>
            <button onClick={() => setListAllPopup(!listAllPopup)}>Library</button>
            <button onClick={() => setUploadPopup(true)}>Upload</button>
          </div>
          <div>
            <button onClick={() => setLoginPopup(true)}>Login</button>
          </div>
        </div>
        <div style={contentStyle}>
          <h1 style={listAllPopup ? {display: 'none'} : headerStyle}>Welcome to DocNest</h1>
          <p style={listAllPopup ? {display: 'none'} : paragraphStyle}>Your document management solution.</p>
          {listAllPopup && <ListAll trigger={listAllPopup} setTrigger={setListAllPopup} />}
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