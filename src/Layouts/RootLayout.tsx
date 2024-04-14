import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      {/* <nav>nav</nav> */}
      <Outlet />
      {/* <footer>footer</footer> */}
    </div>
  );
};

export default RootLayout;