
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Login/Login";
import ChatWithAi from "../Pages/ChatWithAi/ChatWithAi";
import DiscussWithOthers from "../Pages/DiscussWithOthers/DiscussWithOthers";
import Votes from "../Pages/Votes/Votes";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import InclusiveAiIntroVideoPage from "../Pages/InclusiveAiIntroVideoPage/InclusiveAiIntroVideoPage";
// import WelcomePage from "../Pages/WelcomePage/WelcomePage";

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
            path:"/",
            element: <ChatWithAi/>
          },
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
      },
      {
        path: "/intro",
        element: <InclusiveAiIntroVideoPage/>
      }
      
    ],
  },
]);

export default router;
