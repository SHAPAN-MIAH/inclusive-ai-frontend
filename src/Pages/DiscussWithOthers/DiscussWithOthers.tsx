import React from "react";
import { MdOutlineHowToVote } from "react-icons/md";
import "./DiscussWithOthers.css";

const DiscussWithOthers = () => {
  return (
    <>
      <div className="discuss_with_others_section">
        <div className="discuss_with_others_section_container">
          <div className="container mt-3 p-0">
            <div className="row">
              <div className="col-md-4">
                <div className="discuss_with_others_section_sideArticle_container">
                  <div className="mb-3">
                    <h3>Discuss With Others</h3>
                    <span>
                      Chat with other members in your group about the topic.
                    </span>
                  </div>
                  <h5>Suggested Topic</h5>
                  <div className="suggested_topic_content">
                    <h5>[Appropriateness in social context]</h5>
                    <p>
                      Hove you seen some of the AI-generated images? How do you
                      feel about the way they stand or what they wear?
                    </p>

                    <div className="d-flex">
                      <button>ASK</button>
                      <button>NEXT TOPIC</button>
                    </div>
                  </div>

                  <div className="discuss_with_others_section_sideArticle_btn_container mb-3">
                    <button>
                      <span>
                        <MdOutlineHowToVote /> Vote on topic
                      </span>
                      <br /> Stereotypical Generative AI
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="discuss_with_others_chat_container">chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussWithOthers;
