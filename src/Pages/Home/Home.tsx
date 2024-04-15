import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="home_section">
      <div className="menu_bar">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
