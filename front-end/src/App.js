import React from 'react';
// import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Provider from './context/Provider';
import './global.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Routes />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
