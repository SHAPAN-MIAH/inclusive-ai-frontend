import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../assets/BaseUrl";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import "./VoteCast.css";
import { setCurrentUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const VoteCast = () => {
  const currentUser = useSelector(
    (state: RootState) => state?.userData?.currentUser
  );
  const dispatch: AppDispatch = useDispatch();
  const token: any = currentUser?.token;
  const voteTokens: any = currentUser?.user?.data?.tokens;

  const [voteQuantityOne, setVoteQuantityOne] = useState<number>(0);
  const [voteQuantityTwo, setVoteQuantityTwo] = useState<number>(0);
  const [voteQuantityThree, setVoteQuantityThree] = useState<number>(0);
  const [voteQuantityFour, setVoteQuantityFour] = useState<number>(0);

  const handleIncreaseOne = () => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
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
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    setVoteQuantityTwo((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleIncreaseThree = () => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    setVoteQuantityThree((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleIncreaseFour = () => {
    if (
      voteTokens ===
      voteQuantityOne + voteQuantityTwo + voteQuantityThree + voteQuantityFour
    ) {
      return;
    }
    setVoteQuantityFour((prevQuantity) =>
      prevQuantity < voteTokens ? prevQuantity + 1 : prevQuantity
    );
  };

  const handleDecreaseOne = () => {
    if (voteQuantityOne >= 1) {
      setVoteQuantityOne((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleDecreaseTwo = () => {
    if (voteQuantityTwo >= 1) {
      setVoteQuantityTwo((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleDecreaseThree = () => {
    if (voteQuantityThree >= 1) {
      setVoteQuantityThree((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleDecreaseFour = () => {
    if (voteQuantityFour >= 1) {
      setVoteQuantityFour((prevQuantity) => prevQuantity - 1);
    }
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
    if (Number.isNaN(newQuantity)) {
      setVoteQuantityOne(0);
      return;
    }
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= voteTokens &&
      voteTokens >
        newQuantity + voteQuantityTwo + voteQuantityThree + voteQuantityFour
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
    if (Number.isNaN(newQuantity)) {
      setVoteQuantityTwo(0);
      return;
    }
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= voteTokens &&
      voteTokens >
        newQuantity + voteQuantityOne + voteQuantityThree + voteQuantityFour
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
    if (Number.isNaN(newQuantity)) {
      setVoteQuantityThree(0);
      return;
    }
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= voteTokens &&
      voteTokens >
        newQuantity + voteQuantityTwo + voteQuantityOne + voteQuantityFour
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
    if (Number.isNaN(newQuantity)) {
      setVoteQuantityFour(0);
      return;
    }
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      newQuantity <= voteTokens &&
      voteTokens >
        newQuantity + voteQuantityTwo + voteQuantityThree + voteQuantityOne
    ) {
      setVoteQuantityFour(newQuantity);
    }
  };

  const [successMessage, setSuccessMessage] = useState("");

  const VoteSubmit = () => {
    const hideBtn: Element | null | any =
      document.querySelector("#voteSubmitBtn");
    const showBtn: Element | null | any =
      document.querySelector("#voteSubmittingBtn");
    if (hideBtn) {
      hideBtn.style.display = "none";
    }
    if (showBtn) {
      showBtn.style.display = "block";
    }
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
        setVoteQuantityOne(0);
        setVoteQuantityTwo(0);
        setVoteQuantityThree(0);
        setVoteQuantityFour(0);
        if (res) {
          axios
            .get(baseUrl + `/user/user-details`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              dispatch(
                setCurrentUser({
                  user: response.data,
                  token,
                })
              );

              if (hideBtn) {
                hideBtn.style.display = "block";
              }
              if (showBtn) {
                showBtn.style.display = "none";
              }
            });
        }
      });
  };

  return (
    <>
      <div className="col-md-8">
        <div className="vote_cast_container">
          <h6>Cast your votes! you must use all votes.</h6>
          <div className="vote_cast_content">
            <div className="vote_remaining">
              <small>
                Vote remaining ={" "}
                {voteTokens -
                  voteQuantityOne -
                  voteQuantityTwo -
                  voteQuantityThree -
                  voteQuantityFour}
              </small>
            </div>
            <div className="vote_input_content_container">
              <div className=" vote_input_content">
                <span>Use the current model as is</span>{" "}
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
                <span>Context-Aware Adaptation</span>{" "}
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
                <span>User Feedback Loop Integration</span>{" "}
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
                <span>Advanced Modality Integration Techniques</span>{" "}
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
              <p className="vote_submit_success_message text-success mx-2 mt-3">
                {successMessage}
              </p>
              <button id="voteSubmittingBtn">Vote Submitting...</button>
              <button id="voteSubmitBtn" onClick={VoteSubmit}>
                VOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteCast;
