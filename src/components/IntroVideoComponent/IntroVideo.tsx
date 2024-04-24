import React from "react";
import { Link } from "react-router-dom";
import "./introVideo.css";

const IntroVideo = () => {
  return (
    <div className="intro_video_section_page">
      <div className="intro_header">
        <h4>Intro</h4>
      </div>
      <div className="intro_video_content">
        <h3>Watch the intro video</h3>
        <div>
          <iframe
            width="640"
            height="360"
            src="https://www.youtube.com/embed/oBU2p72SsrM"
            title="Inclusive AI — Intro"
            frameborder ="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <Link to={"/chat-with-ai"}>
          <button className="continue_btn">Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default IntroVideo;
