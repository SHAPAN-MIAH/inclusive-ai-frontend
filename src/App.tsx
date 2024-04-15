import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Route";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
