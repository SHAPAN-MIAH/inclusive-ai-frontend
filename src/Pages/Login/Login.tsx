import React, {  useEffect, useState } from "react";
import "./Login.css";
import axios from "axios"; 
import { baseUrl } from "../../assets/BaseUrl";
// import OtpInput from "react-otp-input";

interface IState {
  user: {
    email: string;
  };
}

const Login = () => {
  const [state, setState] = useState<IState>({
    user: {
      email: "",
    },
  });

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [otpSuccessStatus, setOtpSuccessStatus] = useState(false);
  // const [otp, setOtp] = useState("");



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      user: {
        ...state.user,
        [event.target.name]: event.target.value,
      },
    });
  };
  

  const emailSubmit = (event: React.FormEvent<HTMLInputElement>) : void => {
    event.preventDefault();

    // try {
       axios.post(`${baseUrl}/auth/request-otp`, state.user)
      .then((res) => {

        console.log(res);

        // if (res.data.status == "success") {
        //   setOtpSuccessStatus(true);

        //   const loginWithNumberFormContainer = document.querySelector(
        //     ".login-with-number-form-container"
        //   );
        //   const otp_box = document.querySelector(".otp_box");

        //   loginWithNumberFormContainer.style.display = "none";
        //   otp_box.style.display = "block";
        // }
      });
    // } catch (error) {
    //   console.log("error.message")
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



  // const resendOtpData = {
  //   email: state.user.email,
  //   resend: 0,
  // };

  // const resendOTP = () => {
  //   setMinutes(3);
  //   setSeconds(0);
  //   axios.post(`${baseUrl}/auth/send`, resendOtpData).then((res) => {
  //   });
  // };

  // const otpSubmitData = {
  //   email: `${state.user.email}`,
  //   pin: `${otp}`,
  // };

  // const otpSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(userLogin(otpSubmitData));

  //   if (!navLoginOpen == true) {
  //     localStorage.setItem("modalLogin", "true");
  //   }
  // };


  // const onSubmit = (data) => {
  //   dispatch(userLogin(data));

  //   if (!navLoginOpen == true) {
  //     localStorage.setItem("modalLogin", "true");
  //   }
  // };


  return (
    <div className="login_page_section">
      <div className="login_form_container">
        <div className="login_card">
          <h1>Inclusive AI</h1>

          <div className="login_with_email_container mt-5">
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

            {/* <div className="otp_box">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
