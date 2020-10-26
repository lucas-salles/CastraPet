import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Routes from "./routes";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <div className="App">
      <UserStorage>
        <div className="AppBody">
          <Routes />
        </div>
        <Footer />
      </UserStorage>
    </div>
  );
}

export default App;
