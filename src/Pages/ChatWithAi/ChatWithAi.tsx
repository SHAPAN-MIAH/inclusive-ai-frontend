import React, { useEffect, useRef, useState } from "react";
import "./ChatWithAi.css";
import {
  MdOutlineHowToVote,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import chatGPTIcon from "../../assets/icons/chatgptLogo.svg";
import userIcon from "../../assets/icons/user-icon.png";
import sendIcon from "../../assets/icons/send.svg";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ChatWithAi = () => {
  const currentUser = useSelector((state: RootState) => state?.userData?.currentUser);
  const token = currentUser?.token;
  const msgEnd = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<{ prompt: string }>({prompt: "",});
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi, I'm ChatGPT, a state of the art language model developed by openAI. I'm designed to understand and generate human like text based on the input i receive. You can ask me questions, have conversations, seek information, or even request assistance with various task, just let me know How can I help you today?", 
    isBot: true },
  ]);


  useEffect(()=> {
    msgEnd?.current?.scrollIntoView()
  }, [messages])


  useEffect(() => {
    axios.get(baseUrl + `/chat-with-ai/previous-all-responses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      console.log(res.data.data)
      // setMessages([
      //   { text: res.data.data.map(i => i.prompt), isBot: false },
      //   { text: res.data.data.map(i => i.message ), isBot: true },
      // ]);
    })
    
  }, [])
  

  // console.log(messages)


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({
      prompt: event.target.value,
    });
  };


  const handleSend = async () => {
    const InputText = input.prompt;

    setInput('');
    setMessages([
      ...messages,
      {text: InputText, isBot:false}
    ])

    await axios
      .post(baseUrl + `/chat-with-ai/get-response`, input, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages([
          ...messages,
          { text: InputText, isBot: false },
          { text: res.data.data.message, isBot: true },
        ]);
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
                    

                    {messages.map((message) => (
                      <>
                        <div className={message.isBot?  "chat bot" : "chat"}>
                          <img src={message.isBot? chatGPTIcon : userIcon} alt="" />
                          <p>{message.text}</p>
                        </div>
                      </>
                    ))}

                    <div ref={msgEnd}/>
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
