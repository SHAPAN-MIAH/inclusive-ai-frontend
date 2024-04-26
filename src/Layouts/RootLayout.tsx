import { Outlet } from "react-router-dom";
import "./Layout.css";

const RootLayout = () => {
  return (
    <div className="layout container-fluid">
      <Outlet />
    </div>
  );
};

export default RootLayout;
