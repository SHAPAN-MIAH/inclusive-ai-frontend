import React from "react";
import "./header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header_section">
      <div className="header_container">
        <h1>Inclusive Ai</h1>
        {location.pathname == "/chat-with-ai" ? (
          <p>Converse Ai</p>
        ) : location.pathname == "/discuss-with-others" ? (
          <p>Discuss With Others</p>
        ) : location.pathname == "/votes" ? (
          <p>Votes</p>
        ) : (
          ""
        )}
        <p>.....@......</p>
      </div>
    </div>
  );
};

export default Header;
