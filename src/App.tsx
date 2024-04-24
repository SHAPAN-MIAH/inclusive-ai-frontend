import React, { useEffect} from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Route";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { baseUrl } from "./assets/BaseUrl";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { setCurrentUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch: AppDispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token:any = currentUser?.token;

  useEffect(() => {
    axios.get(baseUrl + `/user/user-details`,  {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      console.log(res.data)
       dispatch(setCurrentUser({
        user: res.data, token
       }));
    })

    
  }, [])

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
