import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { AppDispatch } from "../../store";
import { setCurrentUser } from "../../features/user/userSlice";


interface IState {
  user: {
    email: string;
  };
}

const Login = () => {
  const dispatch: AppDispatch = useDispatch();


  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
  const [otp, setOtp] = useState("");
  const [state, setState] = useState<IState>({
    user: {
      email: "",
    },
  });

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    });
  };

  // email submit function handler.............................
  const emailSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    try {
      axios.post(`${baseUrl}/auth/request-otp`, state.user).then((res) => {
        // console.log(res)
        if (res.data.success === true) {
          setOtpSuccessStatus(true);
        }
      });
    } catch (error) {
      console.log("error.message");
    }
  };

  // otp timer function....................
  useEffect(() => {
    if (otpSuccessStatus === true) {
      const interval = setTimeout(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [otpSuccessStatus, seconds, minutes]);


  // otp resend request function........................
  const resendOtpData = {
    email: state.user.email,
  };

  const resendOTP = () => {
    setMinutes(5);
    setSeconds(0);

    axios.post(`${baseUrl}/auth/request-otp`, resendOtpData)
    .then((res) => {
      console.log(res);
    });
  };


  // otp submit function.....................
  const otpSubmitData = {
    email: `${state.user.email}`,
    otp: `${otp}`,
  };

  const otpSubmit = () => {
    try {
      axios.post(`${baseUrl}/auth/verify-otp`, otpSubmitData)
      .then((res) => {
        if (res.data.success === true) {

          dispatch(setCurrentUser({ token: res.data.data }));
          localStorage.setItem("token", res.data.data.token);
          navigate("/chat-with-ai")

        }
      });
    } catch (error) {
      console.log("error.message");
    }
  };



  return (
    <div className="login_page_section">
      <div className="login_form_container">
        <div className="login_card">
          <h1>Inclusive AI</h1>

          <div className="login_with_email_container mt-5">
            {otpSuccessStatus === true ? (
              <div className="otp_box">
                <strong>We've sent a 6-digit OTP in your email</strong>
                <br />
                <br />
                <span>Please enter 6 digit OTP to verify your identity</span>
                <div className="d-flex justify-content-center">
                  <div>
                    <div className="d-flex justify-content-center">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span></span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          width: "40px",
                          borderRadius: "0px",
                          padding: "5px 10px",
                          outline: "none",
                          border: "1px solid gray",
                          fontSize: "18px",
                          marginTop: "10px",
                        }}
                      />
                    </div>

                    <div className="resendTimer">
                      <div className="countdown-text">
                        {seconds > 0 || minutes > 0 ? (
                          <p>
                            Request OTP Again:{" "}
                            {minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </p>
                        ) : (
                          <p>Didn't receive the code?</p>
                        )}

                        {seconds > 0 || minutes > 0 ? null : (
                          <span onClick={resendOTP} className="resendOtpBtn">
                            Resend OTP
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={otpSubmit} id="otpSubmitBtn">
                  {" "}
                  Enter
                </button>
                <br />
              </div>
            ) : (
              <form onSubmit={emailSubmit}>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Enter your Email"
                  className="emailLoginInput"
                  value={state.user.email}
                  onChange={handleChange}
                />
                <br />
                <button className="signin_btn" type="submit">
                  Login / Sign up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
