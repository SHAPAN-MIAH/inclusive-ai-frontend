import { useEffect, useRef, useState } from "react";
import { MdOutlineHowToVote } from "react-icons/md";
import "./DiscussWithOthers.css";
import sendIcon from "../../assets/icons/send.svg";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import ProfileImage from "./ProfileImage";

const socket = io(`http://server.inclusiveai.site`, {
  withCredentials: true,
  transports: ["websocket"],
});

const DiscussWithOthers = () => {
  // topic change functionality under the below.....................................
  const [input, setInput] = useState<string>("");
  const [topicOne, setTopicOne] = useState(true);
  const [topicTwo, setTopicTwo] = useState(false);
  const [topicThree, setTopicThree] = useState(false);
  const [topicFour, setTopicFour] = useState(false);

  const topicOneNextHandler = () => {
    setTopicOne(false);
    setTopicTwo(true);
    setTopicThree(false);
    setTopicFour(false);
  };
  const topicTwoNextHandler = () => {
    setTopicOne(false);
    setTopicTwo(false);
    setTopicThree(true);
    setTopicFour(false);
  };
  const topicThreeNextHandler = () => {
    setTopicOne(false);
    setTopicTwo(false);
    setTopicThree(false);
    setTopicFour(true);
  };
  const topicFourNextHandler = () => {
    setTopicOne(true);
    setTopicTwo(false);
    setTopicThree(false);
    setTopicFour(false);
  };

  const copyToAskText = (str: string) => {
    const element = document.createElement("textarea");
    element.value = str;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
  };

  const askTopicHandler = async (name: number) => {
    const textElement: HTMLElement | null = document.querySelector(
      name == 1
        ? ".topic_text_one"
        : name == 2
        ? ".topic_text_two"
        : name == 3
        ? ".topic_text_three"
        : name == 4
        ? ".topic_text_four"
        : ""
    );
    if (textElement) {
      const text: string = textElement.innerText;
      copyToAskText(text);

      const chatInput: HTMLInputElement | null =
        document.querySelector("#chatInput");
      if (chatInput) {
        chatInput.focus();
        // const clipboardText = await navigator.clipboard.readText();
        // chatInput.value = clipboardText;
        setInput(text)

      }
    }
  };

  // Chat with others all functionality under the below...............................
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token = currentUser?.token;
  const AuthEmail = currentUser?.user?.data?.email;

  
  const [messages, setMessages] = useState<any[]>([]);
  const msgEnd = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (msgEnd.current) {
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    axios
      .get(baseUrl + `/discuss-chat/get-previous-messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setMessages([...messages, ...res.data.data]);
      });

    socket.on("connect", () => {
      console.log("connect is on");
    });

    socket.on("discuss-message", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
      setInput("");
    });

    socket.on("discuss-message-error", (message: any) => {
      console.log(message);
    });

    // socket.disconnect();
  }, []);

  const handleSend = async () => {
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
                  {topicOne && (
                    <div className="suggested_topic_content">
                      <h5>[AI Response could be Comprehensiveness]</h5>
                      <p className="topic_text_one">
                        What’s your thoughts on the response generated by AI in
                        covering all significant moments and candidates equally
                        in the writing? What AI could do differently?
                      </p>

                      <div className="d-flex">
                        <button onClick={() => askTopicHandler(1)}>ASK</button>
                        <button onClick={topicOneNextHandler}>NEXT TOPIC</button>
                      </div>
                    </div>
                  )}
                  {topicTwo && (
                    <div className="suggested_topic_content">
                      <h5>[AI Response could be more objective]</h5>
                      <p className="topic_text_two">
                        What’s your thoughts on the AI generated response
                        towards a particular candidate or viewpoint from the
                        video analysis? Do you think AI could present a more
                        balanced analysis. How can it be improved?
                      </p>

                      <div className="d-flex">
                        <button onClick={() => askTopicHandler(2)}>ASK</button>
                        <button onClick={topicTwoNextHandler}>NEXT TOPIC</button>
                      </div>
                    </div>
                  )}
                  {topicThree && (
                    <div className="suggested_topic_content">
                      <h5>[AI Response could be more in-depth]</h5>
                      <p className="topic_text_three">
                        What do you think about how the AI understood the
                        situation? Did it seem like it only present the surface
                        or really got deep into things?
                      </p>

                      <div className="d-flex">
                        <button onClick={() => askTopicHandler(3)}>ASK</button>
                        <button onClick={topicThreeNextHandler}>NEXT TOPIC</button>
                      </div>
                    </div>
                  )}
                  {topicFour && (
                    <div className="suggested_topic_content">
                      <h5>[AI Presentation of the Analysis could be clear]</h5>
                      <p className="topic_text_four">
                        What’s your thought on the information presented by AI?
                        Is is clear, engaging, and easy-to-follow manner? How
                        can you think it can be improved?
                      </p>

                      <div className="d-flex">
                        <button onClick={() => askTopicHandler(4)}>ASK</button>
                        <button onClick={topicFourNextHandler}>NEXT TOPIC</button>
                      </div>
                    </div>
                  )}

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
                          message?.senderEmail
                            ? "discuss_chat1"
                            : "discuss_chat2"
                        }
                        key={i}
                      >
                        {message?.senderEmail == message?.senderEmail ? (
                          <>
                            <p>{message?.message}</p>
                            <ProfileImage email={message?.senderEmail && message?.senderEmail} />
                          </>
                        ) : (
                          <>
                            <p>{message?.message}</p>
                            <ProfileImage email={AuthEmail as string} />
                          </>
                        )}
                      </div>
                    ))}

                    <div ref={msgEnd} />
                  </div>
                  <div className="chat_footer">
                    <div className="inp">
                      <input
                        type="text"
                        id="chatInput"
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
