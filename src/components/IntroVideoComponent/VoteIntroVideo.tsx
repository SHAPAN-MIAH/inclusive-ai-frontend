import React from "react";
import WeightedVoteVideo from "../../assets/videos/Weighted voting.mp4";
import quadraticVoteVideo from "../../assets/videos/Idea Ink _ What is Quadratic Voting_.mp4";

const VoteIntroVideoPage = () => {
  return (
    <div className="intro_video_section_page">
      <div className="intro_video_content mt-3">
        <h4>Watch the intro video</h4>
        <div className="mt-3 d-flex justify-content-around">
          <div>
            <p>What is Quadratic voting?</p>
           
             <video
              aria-label="Video"
              controls
              style={{
                borderRadius: "5px",
                width: "auto",
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                marginLeft: "40px",
              }}
            >
              <source type="video/webm" src={quadraticVoteVideo} />
            </video>
          </div>

          <div>
            <p>What is Weighted voting?</p>
            <video
              aria-label="Video"
              controls
              style={{
                borderRadius: "5px",
                width: "auto",
                height: "300px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                marginLeft: "40px",
              }}
            >
              <source type="video/webm" src={WeightedVoteVideo} />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteIntroVideoPage;
