import { Link } from "react-router-dom";
import "./introVideo.css";
import { useRef, useState } from "react";
import introVideo from "../../assets/videos/Inclusive AI — Intro (1).mp4";
import toast, { Toaster } from "react-hot-toast";

const IntroVideo = () => {
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const handleEnded = () => {
    setIsEnded(true);
  };

  const introVideoFirstRequire = () => {
    toast.error("Please see the intro video first then press continue.");
  };

  return (
    <div className="intro_video_section_page">
      <div className="intro_header">
        <h4>Intro</h4>
      </div>
      <div className="intro_video_content">
        <h3>Watch the intro video</h3>
        <div>
          <video
            aria-label="Video"
            ref={videoRef}
            onEnded={handleEnded}
            controls
            style={{
              borderRadius: "5px",
              width: "auto",
              height: "300px",
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              marginLeft: "40px",
            }}
          >
            <source type="video/webm" src={introVideo} />
          </video>
        </div>
        {isEnded ? (
          <Link to={"/chat-with-ai"}>
            <button className="continue_btn">Continue</button>
          </Link>
        ) : (
          <button className="continue_btn" onClick={introVideoFirstRequire}>
            Continue
          </button>
        )}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default IntroVideo;
