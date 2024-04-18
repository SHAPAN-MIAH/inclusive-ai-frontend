import React, { useEffect, useState } from "react";
import { MdOutlineHowToVote } from "react-icons/md";
import "./DiscussWithOthers.css";
import userIcon from "../../assets/icons/user-icon.png";
import sendIcon from "../../assets/icons/send.svg";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";


const socket = io(`http://localhost:8000`, {
    withCredentials: true,
    transports: ["websocket"],
  });


const DiscussWithOthers = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token = currentUser?.token;
  const AuthEmail = currentUser?.user?.data?.email;

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  // const [messages, setMessages] = useState<{ message: string; senderEmail: string }[]>([]);

  


  
  useEffect(() => {
    // setMessages([]);
    axios
      .get(baseUrl + `/discuss-chat/get-previous-messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages([...messages, ...res.data.data]);
      });
  }, []);



  useEffect(() => {
    socket.on("connect", () => console.log(socket.id));

    socket.on("discuss-message", (message: any) => {
      console.log(message, messages)
      setMessages([...messages, message.data]);
      setInput("");
    });

    socket.on("discuss-message-error", (message: any) => {
      console.log(message);
    });
  }, []);

  // socket.disconnect();

  const handleSend = async () => {
    const textInput = input;
    setInput('');
    setMessages([
      ...messages,
      {
      message: textInput,
      senderEmail: AuthEmail
    }])

    await socket.emit("discuss-message", {
      message: input,
      token: `Bearer ${token}`,
    });
  };

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
                <div className="discuss_with_others_chat_container">
                  <div className="chats">
                    {messages.map((message, i) => (
                      <div
                        className={
                          AuthEmail === message?.senderEmail
                            ? "discuss_chat1"
                            : "discuss_chat2"
                        }
                        key={i}
                      >
                        {AuthEmail === message?.senderEmail ? (
                          <>
                            <p>{message?.message}</p>
                            <img src={userIcon} alt="" />{" "}
                          </>
                        ) : (
                          <>
                            <img src={userIcon} alt="" />
                            <p>{message?.message}</p>
                          </>
                        )}
                        
                      </div>
                    ))}
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

export default DiscussWithOthers;
