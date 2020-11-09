import React from "react";
import { Router } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import history from "./history";
import Routes from "./routes";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <div className="App">
      <UserStorage>
        <div className="AppBody">
          <Router history={history}>
            <Routes />
          </Router>
        </div>
        <Footer />
      </UserStorage>
    </div>
  );
}

export default App;
