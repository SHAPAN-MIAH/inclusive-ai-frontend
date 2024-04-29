import { useState } from "react";
import "./votes.css";
import { BsChatDots, BsFillPeopleFill, BsQuestionCircle } from "react-icons/bs";
import { GiVote } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import VoteCast from "../../components/VoteCastComponent/VoteCast";
import VoteIntroVideoPage from "../../components/IntroVideoComponent/VoteIntroVideo";
import QuadraticVoteCast from "../../components/VoteCastComponent/QuadraticVoteCast/QuadraticVoteCast";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Votes = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );

  const [introDone, setIntroDone] = useState(false);

  const introDoneHandler = () => {
    setIntroDone(true);
  };

  const [voteContinueBtnEnable, setVoteContinueBtnEnable] =
    useState<boolean>(false);

  const introVideoFirstRequireHandler = () => {
    toast.error("Please see the intro video first then press continue.");
  };

  const proposal_vote_definition: Element | null | any = document.querySelector(
    ".proposal_vote_definition"
  );
 
  const PopupViewHandler = () => {
    if (proposal_vote_definition) {
      proposal_vote_definition.style.display = "block";
    }
  };
  const PopupCloseHandler = () => {
    if (proposal_vote_definition) {
      proposal_vote_definition.style.display = "none";
    }
  };

  

  return (
    <>
      <div className="vote_section">
        {introDone ? (
          <>
            <div className="vote_section_intro_text">
              <small>
                Your vote plays a crucial role in shaping the future of AI. It
                helps ensure fairness for you and the broader community in AI
                usage. The most voted choice will be adopted by organizations
                such as OpenAI, the company behind ChatGPT.
              </small>

              <div className="mt-4">
                <small>
                  In this proposal, there are four potential solutions (options)
                  presented.
                  <br />

                 
                  <span>
                    {currentUser?.user?.data?.originalTokensAssigned == 100
                      ? "You have 100 votes to allocate among that choice. You have the same voting power as all the members voting for this proposal."
                      : currentUser?.user?.data?.originalTokensAssigned == 25
                      ? "You have 25 votes to allocate among those choices. You are one of the 80% of the members in this group who have less voting power than the remaining 20% of the members in this group."
                      : currentUser?.user?.data?.originalTokensAssigned == 400
                      ? "You have 400 votes to allocate among those choices. You are one of the 20% of the members in this group who have more voting power than the remaining 80% of the members in this group."
                      : ""}
                  </span>
                </small>
              </div>
            </div>

            <div className="vote_content_proposal_info_container">
              <div className="row">
                <div className="col-md-9">
                  <div className="vote_proposal_update_content">
                    <h5>[Proposal: Update Current Multi-modal Model for AI]</h5>

                    <p>
                      <b>Objective:</b> To improve AI model, such as multimodal
                      Large Language Models (LLMs), like OpenAI's ChatGPT that
                      can process and generate outputs across multiple types of
                      data such as text, images, and potentially video based on
                      users request, we want to find ways to make these AI
                      models generate high-quality content from.
                    </p>

                    <p>
                      <b>Example Context:</b> Imagine you asked an AI system to
                      generate a summary of a video and its’ close caption using
                      a simple prompt like “ this file contains frames of video
                      clips and closed captions. Please describe what is
                      presented in the video”. Sometimes, the AI might not offer
                      a comprehensive and accurate understanding of the given
                      video and closed caption that you prefer. We want to
                      improve this.
                    </p>

                    <div className="vote_on_how_update_ai_model_content my-4">
                      <h5> Please vote on how to update the Al model:</h5>

                      <ol>
                        <li>
                          <b>Use the current model as is:</b> This means that
                          the AI will continue to generate video and caption
                          summarization the way it does now.
                        </li>
                        <li>
                          <b>Context-Aware Adaptation: </b> This means that
                          model needs improvement in personalizing the summaries
                          that adapt to the specific needs or interests of
                          different users, enhancing relevance and usability,
                          and improving comprehension of context-specific
                          nuances in video and audio content.
                        </li>
                        <li>
                          <b> User Feedback Loop Integration:</b> A feedback
                          mechanism where user interactions (e.g., preferences,
                          corrections, and ratings) directly influence the video
                          summaries overtime.
                        </li>
                        <li>
                          <b>Advanced Modality Integration Techniques:</b> More
                          coherent and comprehensive summaries that integrate
                          cues from visual elements, spoken words, and text
                          effectively. Better synchronization between video
                          scenes and their corresponding parts in closed
                          captions, leading to more accurate and timely
                          summaries.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <a
                    href="https://illinois.qualtrics.com/jfe/form/SV_aY8DrECtjmVpdga"
                    target="_blank"
                  >
                    <button className="take_survey_btn">
                      <BsChatDots /> Take Survey
                    </button>
                  </a>
                  <div className="proposal_info_container">
                    <h6>
                      {" "}
                      <b>Proposal Info</b>
                    </h6>

                    <div className="proposal_info_content">
                      <small>
                        Voting System{" "}
                        <span>
                          {currentUser?.user?.data?.votingDesignId === 1 ||
                          currentUser?.user?.data?.votingDesignId === 2
                            ? "Quadratic"
                            : "Weighted"}{" "}
                          <BsQuestionCircle />
                        </span>
                      </small>
                      <small>
                        Start Date
                        <span>
                          {currentUser?.user?.data?.createdAt
                            ? new Date(
                                currentUser?.user?.data?.createdAt
                              ).toLocaleString()
                            : ""}
                        </span>
                      </small>
                      <small>
                        End Date{" "}
                        <span>
                          {currentUser?.user?.data?.createdAt
                            ? new Date(
                                new Date(
                                  currentUser?.user?.data?.createdAt
                                ).getTime() +
                                  7 * 24 * 60 * 60 * 1000
                              ).toLocaleString()
                            : ""}
                        </span>
                      </small>
                    </div>
                  </div>
                  <div className="voting_power_content_container mt-3">
                    <h6>Your Voting Power</h6>
                    <small>
                      Available Power{" "}
                      <span>{currentUser?.user?.data?.tokens}</span>
                    </small>
                  </div>
                  <button onClick={PopupViewHandler}>
                    <GiVote /> What is "Proposal" and "Vote"?
                  </button>

                  <Link to={"/discuss-with-others"}>
                    <button>
                      <BsFillPeopleFill /> Discuss With Others
                    </button>
                  </Link>
                </div>

                <div className="vote_cast_container_section">
                  {currentUser?.user?.data?.votingDesignId === 1 ||
                  currentUser?.user?.data?.votingDesignId === 2 ? (
                    <QuadraticVoteCast />
                  ) : (
                    <VoteCast />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <VoteIntroVideoPage
              setVoteContinueBtnEnable={setVoteContinueBtnEnable}
            />
            {voteContinueBtnEnable ? (
              <button onClick={introDoneHandler} className="continue_btn">
                Continue
              </button>
            ) : (
              <button
                onClick={introVideoFirstRequireHandler}
                className="continue_btn"
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="proposal_vote_definition">
        <small>
          <b>Proposal:</b> A proposal in this context refers to a formal
          suggestion or plan put forward to be considered by AI companies in
          improving AI Models in future development. In our case, the AI model
          is related to the Multi-modal LLM Model in video analysis
          <br />
          <br />
          <b>Vote:</b> Voting in this scenario refers to the process by which
          users like you express their preferences or approval regarding the
          proposed improvements to the multi-modal LLM model. Through voting,
          your preference will be recorded and will be used to make decision on
          future development by AI companies.
        </small>
        <br />
        <br />
        <button
          className="proposal_vote_definition_popup_close_btn"
          onClick={PopupCloseHandler}
        >
          close
        </button>
      </div>
      
    </>
  );
};

export default Votes;
