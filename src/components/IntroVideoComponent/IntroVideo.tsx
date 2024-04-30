import { Link, useNavigate } from "react-router-dom";
import "./introVideo.css";
import { useRef, useState } from "react";
import introVideo from "../../assets/videos/intro-video-update.mp4";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "../../assets/BaseUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setCurrentUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

interface IStateData {
  user_cloud_id: {
    cloud_research_id: string | number | any;
  };
}
const IntroVideo = () => {
  const currentUser: any = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token: any = currentUser?.token;
  const dispatch: AppDispatch = useDispatch();
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const handleEnded = () => {
    setIsEnded(true);
  };

  const introVideoFirstRequire = () => {
    toast.error("Please see the intro video first then press continue.");
  };

  const [state, setState] = useState<IStateData>({
    user_cloud_id: {
      cloud_research_id: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      user_cloud_id: {
        ...state.user_cloud_id,
        [event.target.name]: event.target.value,
      },
    });
  };

  const navigate = useNavigate();

  const CloudResearchIdSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    try {
      axios
        .post(
          `${baseUrl}/user/set-user-cloud-research-id`,
          state.user_cloud_id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if(res){
            axios.get(baseUrl + `/user/user-details`,  {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
               dispatch(setCurrentUser({
                user: response?.data, token
               }));
  
               if (response?.data?.success === true) {
                navigate("/chat-with-ai");
              }
            })
          }


          
        });
    } catch (error) {
      console.log("error.message");
    }
  };

  return (
    <div className="intro_video_section_page">
      {/* <div className="intro_header">
        <h4>Intro</h4>
      </div> */}
      <div className="intro_video_content">
        <div>
          <h3>Watch the intro video</h3>
          <video
            aria-label="Video"
            ref={videoRef}
            onEnded={handleEnded}
            controls
            style={{
              borderRadius: "5px",
              width: "auto",
              height: "460px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "40px",
            }}
          >
            <source type="video/webm" src={introVideo} />
          </video>
        </div>
        <div>
          {isEnded ? (
            <>
              {currentUser?.user?.data?.cloud_research_id ? (
                <Link to={"/chat-with-ai"}>
                  <button className="continue_btn">Continue</button>
                </Link>
              ) : (
                <form
                  onSubmit={CloudResearchIdSubmit}
                  className="d-flex justify-content-center mt-5"
                >
                  <div>
                    <label htmlFor="">
                      <h5>Provide your cloud research id</h5>
                    </label>
                    <input
                      type="text"
                      name="cloud_research_id"
                      required
                      placeholder="Enter your cloud research id"
                      className="emailLoginInput cloud_research_id_Input"
                      value={state?.user_cloud_id?.cloud_research_id}
                      onChange={handleChange}
                    />
                    <br />
                    <button className="continue_btn" type="submit">
                      Continue
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <button className="continue_btn" onClick={introVideoFirstRequire}>
              Continue
            </button>
          )}
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default IntroVideo;
