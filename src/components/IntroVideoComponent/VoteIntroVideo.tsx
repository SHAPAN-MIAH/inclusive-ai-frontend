import WeightedVoteVideo from "../../assets/videos/Weighted voting.mp4";
import quadraticVoteVideo from "../../assets/videos/Idea Ink _ What is Quadratic Voting_.mp4";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const VoteIntroVideoPage = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );


  return (
    <div className="intro_video_section_page">
      <div className="intro_video_content mt-3">
        <h4>Watch the intro video</h4>
        <div className="mt-4 d-flex justify-content-center">
          {currentUser?.user.data.votingDesignId === 1 ||
          currentUser?.user.data.votingDesignId === 2 ? (
            <div>

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
          ) : (
            <div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteIntroVideoPage;