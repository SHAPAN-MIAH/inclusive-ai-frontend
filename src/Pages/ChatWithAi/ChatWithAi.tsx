import { useEffect, useRef, useState } from "react";
import "./ChatWithAi.css";
import {
  MdOutlineHowToVote,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import chatGPTIcon from "../../assets/icons/chatgptLogo.svg";
import sendIcon from "../../assets/icons/send.svg";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import { useSelector } from "react-redux";
import {  RootState } from "../../store";
// import { useDispatch } from "react-redux";
// import { setChatWithAiVideoAnalysis } from "../../features/chatWithAiContinueSlice";
// import { setChatWithAiVideoAnalysisDone } from "../../features/ChatWithAiAnalysisDone";
import video from "../../assets/videos/presidential-debate.mp4";
import ProfileImage from "../DiscussWithOthers/ProfileImage";
import { Link, useNavigate } from "react-router-dom";

const ChatWithAi = () => {
  // const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const AuthEmail = currentUser?.user?.data?.email;

  // const chatWithAiAnalysisContinue: any = useSelector(
  //   (state: RootState) => state?.chatWithAiAnalysisContinue
  // );
  // const chatWithAiAnalysisDone: any = useSelector(
  //   (state: RootState) => state?.chatWithAiAnalysisDone
  // );

  const token = currentUser?.token;

  const msgEnd = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<{ prompt: string }>({ prompt: "" });
  const [messages, setMessages] = useState<
    { message: string; prompt: string }[]
  >([
    {
      message: "",
      prompt: "",
    },
  ]);

  // const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
  //   { text: "Hi, I'm ChatGPT, a state of the art language model developed by openAI. I'm designed to understand and generate human like text based on the input i receive. You can ask me questions, have conversations, seek information, or even request assistance with various task, just let me know How can I help you today?",
  //   isBot: true },
  // ]);

  useEffect(() => {
    msgEnd?.current?.scrollIntoView();
  }, [messages]);

  const VideoAnalysisContinueHandler = () => {
    // dispatch(setChatWithAiVideoAnalysis(true));
    localStorage.setItem("ChatWithAiVideoAnalysisContinue", "true")

    navigate("/chat-with-ai");
  };

  const chatWithAiAnalysisContinue = localStorage.getItem("ChatWithAiVideoAnalysisContinue")

  const videoAnalysisYesNoMaybeHandler = async (ans : number) => {
    // dispatch(setChatWithAiVideoAnalysisDone(true));
    localStorage.setItem("ChatWithAiVideoAnalysisDone", "true")



    if(ans == 1){
      setInput({
        prompt: `The video analysis generated by ChatGPT for the 2024 US presidential debate was useful.`,
      });
    }else if(ans == 2){
      setInput({
        prompt: `The video analysis generated by ChatGPT for the 2024 US presidential debate was not useful.`,
      });
    }
    else{
      setInput({
        prompt: `I am not sure if the video analysis generated by ChatGPT for the 2024 US presidential debate is useful or not.`,
      });
    }

    const InputText = input.prompt;
    
    setMessages([
      ...messages,
      {
        prompt: InputText,
        message: "",
      },
    ]);
    
  };

  const chatWithAiAnalysisDone = localStorage.getItem("ChatWithAiVideoAnalysisDone")


  useEffect(() => {
    axios
      .get(baseUrl + `/chat-with-ai/previous-all-responses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages([...messages, ...res.data.data]);
      });
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      prompt: event.target.value,
    });
  };

  const handleSend = async () => {
    const InputText = input.prompt;

    setInput({ prompt: "" });
    setMessages([...messages, { prompt: InputText, message: "" }]);

    // setMessages([...messages, { text: InputText, isBot: false }]);

    await axios
      .post(baseUrl + `/chat-with-ai/get-response`, input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages([
          ...messages,
          { message: res.data.data.message, prompt: InputText },
        ]);

        // setMessages([
        //   ...messages,
        //   { text: InputText, isBot: false },
        //   { text: res.data.data.message, isBot: true },
        // ]);
      });
  };

  return (
    <>
      <div className="chat_with_ai_section">
        <div className="chat_with_ai_section_container">
          <div className="container mt-3 p-0">
            <div className="row">
              <div className="col-md-4">
                <div className="chat_with_ai_section_sideArticle_container">
                  <div className="d-flex justify-content-between mb-4">
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
                    <Link to={"/discuss-with-others"}>
                      <button>
                        <BsFillPeopleFill /> Discuss With Others
                      </button>
                    </Link>

                    <Link to={"/votes"}>
                    <button>
                        <MdOutlineHowToVote /> Vote on topic
                    </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="chat_with_ai_section_chat_container">
                  <div className="chats">
                    <>
                      <div className={"chat bot"}>
                        <img src={chatGPTIcon} alt="" />
                        <p>
                          This is a video of presidential election. First watch
                          this video. Below is the video analysis done by
                          ChatGPT. Please read the video summary/analysis.
                        </p>
                      </div>
                      <video
                        aria-label="Video"
                        controls
                        style={{
                          borderRadius: "5px",
                          width: "auto",
                          height: "200px",
                          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                          marginLeft: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <source type="video/webm" src={video} />
                      </video>
                      <br />
                      <button
                        onClick={VideoAnalysisContinueHandler}
                        className="videoAnalysisContinueBtn"
                      >
                        Analyze the video
                      </button>
                      {chatWithAiAnalysisContinue == "true" && (
                        <div>
                          <div className={"chat bot"}>
                            <img src={chatGPTIcon} alt="" />
                            <p>
                              Let's start by displaying a few video frames and
                              examining the content of the subtitle file. The
                              displayed frames from the video reveal a scene
                              consistent with a formal setting, likely a studio
                              or a debate stage. The individuals depicted appear
                              to be engaged in a discussion or debate, which
                              fits the context of a presidential debate based on
                              your file's naming convention.
                            </p>
                          </div>
                          <div className={"chat bot"}>
                            <img src={chatGPTIcon} alt="" />
                            <p>
                              Let's examine the captions: <br />
                              The closed captions from the video indicate that
                              the discussion primarily revolves around
                              significant political issues, specifically health
                              care policies in the United States: <br /> <br />
                              <b>Supreme Court Case on Obamacare:</b> The
                              discussion begins with mentioning a Supreme Court
                              case happening a week after an election, focusing
                              on the Trump administration and several state
                              attorneys general's attempts to overturn
                              Obamacare. <br />
                              <br /> <b>Health Care Plans:</b> The dialogue
                              moves on to address the lack of a comprehensive
                              health care plan to replace Obamacare, despite
                              promises made over the past four years. <br />
                              <br />{" "}
                              <b>Debate Over Replacement of Obamacare:</b>{" "}
                              There's a back-and-forth about whether a
                              replacement plan for Obamacare has been
                              introduced, with a speaker giving another an
                              opportunity to clarify their position. <br />
                              <br /> This summary suggests that the video
                              captures a debate segment where the key topic is
                              the future of the Affordable Care Act (Obamacare),
                              a pivotal issue in American politics, particularly
                              during election times. The discussion includes
                              challenges to the existing law, promises of new
                              plans, and the legal implications of potential
                              repeals. This topic is highly relevant in contexts
                              involving presidential debates or policy
                              discussions.
                            </p>
                          </div>

                          <span className="useFull_question">
                            Did you find useful?
                          </span>

                          <button
                            className="videoAnalysisYesBtn"
                            onClick={() => videoAnalysisYesNoMaybeHandler(1)}
                          >
                            Yes
                          </button>
                          <button
                            className="videoAnalysisNoBtn"
                            onClick={() => videoAnalysisYesNoMaybeHandler(2)}
                          >
                            No
                          </button>
                          <button
                            className="videoAnalysisMaybeBtn"
                            onClick={() => videoAnalysisYesNoMaybeHandler(3)}
                          >
                            Maybe
                          </button>
                        </div>
                      )}
                    </>
                    {chatWithAiAnalysisDone == "true" && (
                      <>
                        {messages.map((message) => (
                          <>
                            {message.prompt && (
                              <div className={"chat"}>
                                {/* <img src={userIcon} alt="" /> */}
                                <ProfileImage email={AuthEmail as string} />
                                <p>{message.prompt}</p>
                              </div>
                            )}
                            {message.message && (
                              <div className={"chat bot"}>
                                <img src={chatGPTIcon} alt="" />
                                <p>{message.message}</p>
                              </div>
                            )}
                          </>
                        ))}
                      </>
                    )}
                    {/* {messages.map((message) => (
                    <>
                      <div className={message.isBot ? "chat bot" : "chat"}>
                        <img
                          src={message.isBot ? chatGPTIcon : userIcon}
                          alt=""
                        />
                        <p>{message.text}</p>
                      </div>
                    </>
                  ))} */}

                    <div ref={msgEnd} />
                  </div>
                  <div className="chat_footer">
                    <div className="inp">
                      <input
                        type="text"
                        placeholder="Send a message"
                        value={input.prompt}
                        onChange={handleInput}
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

// import React, { useState } from "react";
// import "./ChatWithAi.css";
// import { MdOutlineHowToVote, MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
// import { BsFillPeopleFill } from "react-icons/bs";
// import chatGPTIcon from "../../assets/icons/chatgptLogo.svg";
// import userIcon from "../../assets/icons/user-icon.png";
// import sendIcon from "../../assets/icons/send.svg";
// import axios from "axios";
// import { baseUrl } from "../../assets/BaseUrl";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";

// interface Message {
//   text: string;
//   isBot: boolean;
// }

// const ChatWithAi: React.FC = () => {
//   const currentUser = useSelector((state: RootState) => state?.userData?.currentUser);
//   const token = currentUser?.token;

//   const [input, setInput] = useState<{ prompt: string }>({ prompt: "" });
//   const [messages, setMessages] = useState<Message[]>([{ text: "How can I help you today?", isBot: true }]);

//   const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     setInput({ prompt: event.target.value });
//   };

//   const handleSend = async () => {
//     const text = input.prompt;
//     // setInput({ prompt: "" });
//     setMessages([...messages, { text, isBot: false }]);
//     try {
//       const res = await axios.post(baseUrl + `/chat-with-ai/get-response`, { input }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessages([...messages, { text, isBot: false }, { text: res.data.data.message, isBot: true }]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat_with_ai_section">
//       <div className="chat_with_ai_section_container">
//         <div className="container mt-3 p-0">
//           <div className="row">
//             <div className="col-md-4">
//               <div className="chat_with_ai_section_sideArticle_container">
//                 <div className="d-flex justify-content-between">
//                   <h3>Welcome</h3>
//                   <span><MdOutlineKeyboardDoubleArrowLeft /></span>
//                 </div>
//                 <p>
//                   You are participating in a research study. We aim to build a
//                   tool that enables users to contribute input for shaping
//                   future AI rules. Please converse with ChatGPT in the middle
//                   panel and ask any questions you have about this AI topic,
//                   share any preference and expectations that you have.
//                   <br /><br /> Once you finish your conversation with ChatGPT
//                   on this topic, please click the button on the left panel to
//                   fill out a survey. Thank you.
//                 </p>
//                 <div className="chat_with_ai_section_sideArticle_btn_container">
//                   <button><BsFillPeopleFill /> Discuss With Others</button>
//                   <button>
//                     <span><MdOutlineHowToVote /> Vote on topic</span>
//                     <br />Stereotypical Generative AI
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-8">
//               <div className="chat_with_ai_section_chat_container">
//                 <div className="chats">
//                   {messages.map((message, index) => (
//                     <div key={index} className={message.isBot ? "chat bot" : "chat"}>
//                       <img src={message.isBot ? chatGPTIcon : userIcon} alt="" />
//                       <p>{message.text}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chat_footer">
//                   <div className="inp">
//                     <input
//                       type="text"
//                       placeholder="Send a message"
//                       value={input.prompt}
//                       onChange={handleInput}
//                     />
//                     <button className="send" onClick={handleSend}>
//                       <img src={sendIcon} alt="" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatWithAi;
