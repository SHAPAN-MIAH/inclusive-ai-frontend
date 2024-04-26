import "./Navbar.css";
import { BsChatDots, BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineHowToVote } from "react-icons/md";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store";

const Navbar = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );

  return (
    <div className="navbar_container">
      <ul
        className={
          currentUser?.user?.data?.role == "ADMIN" ? "menu_with_admin" : "menu"
        }
      >
        {currentUser?.user?.data?.role == "ADMIN" ? (
          <>
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

            <NavLink
              to={"/discuss-with-others"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <BsFillPeopleFill /> Discuss with Others
              </li>
            </NavLink>
            <NavLink
              to={"/votes"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <MdOutlineHowToVote /> votes
              </li>
            </NavLink>
            <NavLink
              to={"/admin-panel"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <MdOutlineHowToVote /> Admin
              </li>
            </NavLink>
          </>
        ) : (
          <>
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

            <NavLink
              to={"/discuss-with-others"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <BsFillPeopleFill /> Discuss with Others
              </li>
            </NavLink>
            <NavLink
              to={"/votes"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <li>
                <MdOutlineHowToVote /> votes
              </li>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
