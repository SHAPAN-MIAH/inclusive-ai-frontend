import { Link } from "react-router-dom";
import "./introVideo.css";
import { useRef, useState } from "react";

const IntroVideo = () => {
  const videoRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const handleEnded = () => {
    setIsEnded(true);
  };

  const introVideoFirstRequire = () => {
    alert("please see intro video first.");
  };

  return (
    <div className="intro_video_section_page">
      <div className="intro_header">
        <h4>Intro</h4>
      </div>
      <div className="intro_video_content">
        <h3>Watch the intro video</h3>
        <div>
          <iframe
            ref={videoRef}
            onEnded={handleEnded}
            width="640"
            height="360"
            src="https://www.youtube.com/embed/oBU2p72SsrM"
            title="Inclusive AI — Intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
    </div>
  );
};

export default IntroVideo;
