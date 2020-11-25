import React from "react";
import Header from "../Header";

import "./loading.css";

const Loading = () => {
  return (
    <>
      <Header titulo="" />

      <div id="loading">
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Loading;
