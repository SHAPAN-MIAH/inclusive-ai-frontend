import React from "react";
import "./header.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { clearCurrentUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );


  const handleClearCurrentUser = () => {
    dispatch(clearCurrentUser());
  };

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

        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            <span>{currentUser?.user.data.email.toString().substring(0, 10)}...</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">
              <span onClick={handleClearCurrentUser}>logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
