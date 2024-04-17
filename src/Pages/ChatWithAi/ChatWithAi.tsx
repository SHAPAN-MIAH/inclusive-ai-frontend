import React, { useState } from "react";
import "./ChatWithAi.css";
import {
  MdOutlineHowToVote,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import chatGPTIcon from "../../assets/icons/chatgptLogo.svg";
import userIcon from "../../assets/icons/user-icon.png";
import sendIcon from "../../assets/icons/send.svg";
import { sendMessageToOpenAi } from "../../openai";

const ChatWithAi = () => {
  const [input, setInput] = useState<string>("");

  const handleSend = async () => {
    const res = await sendMessageToOpenAi(input);
    console.log(res)

  };

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
                    <span>
                      <MdOutlineKeyboardDoubleArrowLeft />
                    </span>
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
                    <button>
                      <BsFillPeopleFill /> Discuss With Others
                    </button>
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
                <div className="chat_with_ai_section_chat_container">
                  <div className="chats">
                    <div className="chat">
                      <img src={userIcon} alt="" />
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sapiente reprehenderit deserunt ratione perferendis
                        laboriosam, iure dolores veritatis odit pariatur atque.
                      </p>
                    </div>
                    <div className="chat bot">
                      <img src={chatGPTIcon} alt="" />
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sapiente reprehenderit deserunt ratione perferendis
                        laboriosam, iure dolores veritatis odit pariatur atque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sapiente reprehenderit deserunt ratione perferendis
                        laboriosam, iure dolores veritatis odit pariatur atque.
                      </p>
                    </div>
                  </div>
                  <div className="chat_footer">
                    <div className="inp">
                      <input
                        type="text"
                        placeholder="Send a message"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />{" "}
                      <button className="send" onClick={handleSend}>
                        <img src={sendIcon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithAi;
