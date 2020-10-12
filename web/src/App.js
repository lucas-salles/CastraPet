import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <div className="AppBody">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
