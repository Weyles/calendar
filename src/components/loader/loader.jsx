import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export { Loader };
