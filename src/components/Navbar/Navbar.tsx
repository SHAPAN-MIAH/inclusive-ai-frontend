import React from "react";
import "./Navbar.css";
import { BsChatDots, BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineHowToVote } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar_container">
      <ul className="menu">
        <NavLink
          to={"/chat-with-ai"}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <li>
            <BsChatDots /> Chat with Ai
          </li>
        </NavLink>

        <NavLink to={"/discuss-with-others"} 
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        >
          <li>
            <BsFillPeopleFill /> Discuss with Others
          </li>
        </NavLink>
        <NavLink to={"/votes"}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        >
          <li>
            <MdOutlineHowToVote /> votes
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
