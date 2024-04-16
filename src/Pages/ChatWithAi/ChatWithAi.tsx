import React from "react";
import "./ChatWithAi.css";
import { MdOutlineHowToVote, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";

const ChatWithAi = () => {
  return (
    <>
      <div className="chat_with_ai_section">
        <div className="chat_with_ai_section_container">
          <div className="container mt-3 p-0">
            <div className="row">
              <div className="col-md-4">
                <div className="chat_with_ai_section_sideArticle_container">
                  <div className="d-flex justify-content-between">
                    <h3>Welcome</h3>
                    <span><MdOutlineKeyboardDoubleArrowLeft /></span>
                  </div>
                  <p>
                    You are participating in a research study. We aim to build a
                    tool that enables users to contribute input for shaping
                    future AI rules. Please converse with ChatGPT in the middle
                    panel and ask any questions you have about this Ai topic,
                    share any preference and expectations that you have.
                    <br /> <br /> Once you finish your conversation with ChatGPT
                    on this topic, please click the button on the left panel to
                    fill out a survey. Thank you.{" "}
                  </p>

                  <div className="chat_with_ai_section_sideArticle_btn_container">
                    <button><BsFillPeopleFill /> Discuss With Others</button>
                    <button>
                      <span><MdOutlineHowToVote /> Vote on topic</span>
                      <br /> Stereotypical Generative AI
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="chat_with_ai_section_chat_container">chat</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithAi;
