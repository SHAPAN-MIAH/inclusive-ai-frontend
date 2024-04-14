import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { baseUrl } from "../../assets/BaseUrl";
import OtpInput from "react-otp-input";

const Login = () => {
  // const dispatch = useDispatch();
  // const { register, handleSubmit } = useForm();
  // const { loginRes } = useSelector((state) => state.loginRes);
  // const { isAuthenticated } = useSelector((state) => state.user);
  // const token = localStorage.getItem("token");

  const [otpRequestData, setOtpRequestData] = useState({
    phone: "",
  });
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setOtpRequestData({ ...otpRequestData, [input.name]: input.value });
  };

  const emailSubmit = async (e) => {
    e.preventDefault();
    const loginWithNumberFormContainer = document.querySelector(
      ".login_with_email_container"
    );
    const otp_box = document.querySelector(".otp_box");
    loginWithNumberFormContainer.style.display = "none";
    otp_box.style.display = "block";


    // try {
    //   await axios.post(`${baseUrl}/auth/send`, otpRequestData).then((res) => {
    //     if (res.data.status == "success") {
    //       setOtpSuccessStatus(true);
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

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

  const resendOtpData = {
    phone: otpRequestData.phone,
    resend: 0,
  };

  const resendOTP = () => {
    setMinutes(3);
    setSeconds(0);
    axios.post(`${baseUrl}/auth/send`, resendOtpData).then((res) => {
      console.log(res);
    });
  };

  // const otpSubmitData = {
  //   phone: `${otpRequestData.phone}`,
  //   pin: `${otp}`,
  // };

  const otpSubmit = (e) => {
    e.preventDefault();
    // dispatch(userLogin(otpSubmitData));

    // if (!navLoginOpen == true) {
    //   localStorage.setItem("modalLogin", "true");
    // }
  };

  // user login action dispatch.........
  // const onSubmit = (data) => {
  //   dispatch(userLogin(data));

  //   if (!navLoginOpen == true) {
  //     localStorage.setItem("modalLogin", "true");
  //   }
  // };

  // useEffect(() => {
  //   if (isAuthenticated == true && token) {
  //     loginRes?.status == "success" &&
  //       toast.success(`${loginRes?.message}`, {
  //         duration: 2000,
  //         style: {
  //           width: "100%",
  //           height: "80px",
  //           padding: "0px 20px",
  //           background: "#86bc19",
  //           color: "#fff",
  //         },
  //       });
  //   }
  // }, [loginRes, isAuthenticated, token]);

  return (
    <div className="login_page_section">
      <div className="login_form_container">
        <div className="login_card">
          <h1>Inclusive Ai</h1>

          <div className="login_with_email_container mt-5">
            <form onSubmit={emailSubmit}>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your Email"
                className="emailLoginInput"
                onChange={handleChange}
              />
              <br />
              <button className="signin_btn" type="submit">
                Login / Sign up
              </button>
            </form>

            <div className="otp_box">
              <strong>We've sent a 4-digit OTP in your email</strong>
              <br />
              <br />
              <span>Please enter 4 digit OTP to verify your identity</span>
              <div className="d-flex justify-content-center">
                <div>
                  <div className="d-flex justify-content-center">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
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

              <button onClick={otpSubmit} type="submit" id="otpSubmitBtn">
                {" "}
                Enter
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
