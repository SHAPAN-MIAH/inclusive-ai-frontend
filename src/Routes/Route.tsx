import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Login/Login";
import ChatWithAi from "../Pages/ChatWithAi/ChatWithAi";
import DiscussWithOthers from "../Pages/DiscussWithOthers/DiscussWithOthers";
import Votes from "../Pages/Votes/Votes";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute><Home /></ProtectedRoute> ,
        children: [
          {
            path: "/chat-with-ai",
            element: <ChatWithAi/>
          },
          {
            path: "/discuss-with-others",
            element: <DiscussWithOthers/>
          },
          {
            path: "/votes",
            element: <Votes/>
          },
        ]
      },
      {
        path: "/login",
        element: <Login/>
      }
      
    ],
  },
]);

export default router;
