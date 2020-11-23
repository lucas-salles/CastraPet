import React from "react";
import Header from "./Header";

import "./loading.css";

const Loading = () => {
  return (
    <>
      <Header titulo="" />

      <div id="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Loading;
