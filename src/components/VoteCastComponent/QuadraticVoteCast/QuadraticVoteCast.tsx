import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../assets/BaseUrl";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const QuadraticVoteCast = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const token = currentUser?.token;
  const voteTokens: any = currentUser?.user?.data?.tokens;
  // const [vote, setVote] = useState<number>(voteTokens);
  const [voteQuantityOne, setVoteQuantityOne] = useState<number>(0);
  const [voteQuantityTwo, setVoteQuantityTwo] = useState<number>(0);
  const [voteQuantityThree, setVoteQuantityThree] = useState<number>(0);
  const [voteQuantityFour, setVoteQuantityFour] = useState<number>(0);

  const handleIncreaseOne = () => {
    if (
      voteTokens ===
      Math.pow(
        voteQuantityOne +
          voteQuantityTwo +
          voteQuantityThree +
          voteQuantityFour,
        2
      )
    ) {
      return;
    }

    setVoteQuantityOne((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleIncreaseTwo = () => {
    if (
      voteTokens ===
      Math.pow(
        voteQuantityOne +
          voteQuantityTwo +
          voteQuantityThree +
          voteQuantityFour,
        2
      )
    ) {
      return;
    }
    setVoteQuantityTwo((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );
    // setVote((prevVote) => (prevVote > 0 ? prevVote - 1 : 0));
  };

  const handleIncreaseThree = () => {
    if (
      voteTokens ===
      Math.pow(
        voteQuantityOne +
          voteQuantityTwo +
          voteQuantityThree +
          voteQuantityFour,
        2
      )
    ) {
      return;
    }
    setVoteQuantityThree((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );

    // setVote((prevVote) => (prevVote > 0 ? prevVote - 1 : 0));
  };

  const handleIncreaseFour = () => {
    if (
      voteTokens ===
      Math.pow(
        voteQuantityOne +
          voteQuantityTwo +
          voteQuantityThree +
          voteQuantityFour,
        2
      )
    ) {
      return;
    }
    setVoteQuantityFour((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );

    // setVote((prevVote) => (prevVote > 0 ? prevVote - 1 : 0));
  };

  const handleDecreaseOne = () => {
    if (voteQuantityOne >= 1) {
      setVoteQuantityOne((prevQuantity) => prevQuantity - 1);
    }
    // setVote((prevVote) => prevVote + 1);
  };

  const handleDecreaseTwo = () => {
    if (voteQuantityTwo >= 1) {
      setVoteQuantityTwo((prevQuantity) => prevQuantity - 1);
    }
    // setVote((prevVote) => prevVote + 1);
  };

  const handleDecreaseThree = () => {
    if (voteQuantityThree >= 1) {
      setVoteQuantityThree((prevQuantity) => prevQuantity - 1);
    }
    // setVote((prevVote) => prevVote + 1);
  };

  const handleDecreaseFour = () => {
    if (voteQuantityFour >= 1) {
      setVoteQuantityFour((prevQuantity) => prevQuantity - 1);
    }
    // setVote((prevVote) => prevVote + 1);
  };

  const handleChangeOne = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }

    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= voteTokens &&
      voteTokens >=
        Math.pow(
          newQuantity + voteQuantityTwo + voteQuantityThree + voteQuantityFour,
          2
        )
    ) {
      setVoteQuantityOne(newQuantity);
    }
  };

  const handleChangeTwo = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= voteTokens &&
      voteTokens >=
        Math.pow(
          newQuantity + voteQuantityOne + voteQuantityThree + voteQuantityFour,
          2
        )
    ) {
      setVoteQuantityTwo(newQuantity);
    }
  };

  const handleChangeThree = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= voteTokens &&
      voteTokens >=
        Math.pow(
          newQuantity + voteQuantityTwo + voteQuantityOne + voteQuantityFour,
          2
        )
    ) {
      setVoteQuantityThree(newQuantity);
    }
  };

  const handleChangeFour = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    const newQuantity = parseInt(event.target.value);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= voteTokens &&
      voteTokens >=
        Math.pow(
          newQuantity + voteQuantityTwo + voteQuantityThree + voteQuantityOne,
          2
        )
    ) {
      setVoteQuantityFour(newQuantity);
    }
  };

  const [successMessage, setSuccessMessage] = useState("")
  const VoteSubmit = () => {
    axios
      .post(
        baseUrl + `/vote-submission/create`,
        {
          choice_1: voteQuantityOne,
          choice_2: voteQuantityTwo,
          choice_3: voteQuantityThree,
          choice_4: voteQuantityFour,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setSuccessMessage(res.data.message);
        setVoteQuantityOne(0)
        setVoteQuantityTwo(0)
        setVoteQuantityThree(0)
        setVoteQuantityFour(0)


      });
  };

  // Function to render boxes based on vote count
  const renderBoxes = () => {
    const boxes = [];
    for (
      let i = 0;
      i <
      voteTokens -
        Math.pow(
          voteQuantityOne +
            voteQuantityTwo +
            voteQuantityThree +
            voteQuantityFour,
          2
        );
      i++
    ) {
      boxes.push(<div key={i} className="box"></div>);
    }
    return boxes;
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <div className="vote_cast_container">
            <h6>Cast your votes! you must use all votes.</h6>
            <div className="vote_cast_content">
              <div className="vote_remaining">
                <small>
                  Vote remaining ={" "}
                  {voteTokens -
                    Math.pow(
                      voteQuantityOne +
                        voteQuantityTwo +
                        voteQuantityThree +
                        voteQuantityFour,
                      2
                    )}
                </small>
              </div>
              <div className="vote_input_content_container">
                <div className=" vote_input_content">
                  <span>Use the current model is</span>{" "}
                  <div className="vote_input">
                    <span onClick={handleDecreaseOne}>-</span>
                    <input
                      type="text"
                      value={voteQuantityOne}
                      onChange={handleChangeOne}
                    />
                    <span onClick={handleIncreaseOne}>+</span>
                  </div>
                </div>
                <div className=" vote_input_content">
                  <span>Use additional user information</span>{" "}
                  <div className="vote_input">
                    <span onClick={handleDecreaseTwo}>-</span>
                    <input
                      type="text"
                      value={voteQuantityTwo}
                      onChange={handleChangeTwo}
                    />
                    <span onClick={handleIncreaseTwo}>+</span>
                  </div>
                </div>
                <div className=" vote_input_content">
                  <span>Track and apply user preference</span>{" "}
                  <div className="vote_input">
                    <span onClick={handleDecreaseThree}>-</span>
                    <input
                      type="text"
                      value={voteQuantityThree}
                      onChange={handleChangeThree}
                    />
                    <span onClick={handleIncreaseThree}>+</span>
                  </div>
                </div>
                <div className=" vote_input_content">
                  <span>Add specific flags/tags in requests</span>{" "}
                  <div className="vote_input">
                    <span onClick={handleDecreaseFour}>-</span>
                    <input
                      type="text"
                      value={voteQuantityFour}
                      onChange={handleChangeFour}
                    />
                    <span onClick={handleIncreaseFour}>+</span>
                  </div>
                </div>
                <p className="vote_submit_success_message text-success mx-2 mt-3">{successMessage}</p>
                <button id="voteSubmitBtn" onClick={VoteSubmit}>
                  VOTE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          {voteTokens -
            Math.pow(
              voteQuantityOne +
                voteQuantityTwo +
                voteQuantityThree +
                voteQuantityFour,
              2
            ) !=
          0 ? (
            <div className="quadratic_vote_square_box_container">
              <div className="box-container">{renderBoxes()}</div>
            </div>
          ) : (
            <p className="text-danger mt-5 pt-5">
              You don't have any vote tokens remaining.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuadraticVoteCast;
