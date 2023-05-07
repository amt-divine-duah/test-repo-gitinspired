import axios from "axios";
import api from "../ApiClient";
import "../App.css";
import { useEffect, useState } from "react";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { showErrorMessage, showSuccessMessage } from "../constants/messages";

interface FormErrors {
  emailOrId?: string[];
  password?: string[];
}


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [invalidRes, setInvalidRes] = useState(null);
  const [error, setError]= useState(false)
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/landing");
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = { emailOrId: email, password: password };
      const response =  await api.post("/api/auth/login", formData)
      if (response.status === StatusCodes.OK) {
        if (
          signIn({
            token: response.data?.data["accessToken"],
            expiresIn: 60,
            tokenType: "Bearer",
            authState: {
              ...response.data?.data,
            },
          })
        ) {
          showSuccessMessage(`${response.data?.message}`)
          navigate("/landing");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setInvalidRes(null)
          setFormErrors(error.response?.data["error"]);
          setError(prev => !prev)
          return
        }
        if (error.response?.status === StatusCodes.BAD_REQUEST) {
          setFormErrors({})
          setInvalidRes(error.response?.data["message"]);
          return
        }
        else {
          setFormErrors({});
          setInvalidRes(null)
          showErrorMessage("Something went wrong");
          return
        }
        
      }
      else {
        showErrorMessage("Something went wrong");
      }
    }
  }

  const emailTooltip = document.getElementById("tooltip-email") as HTMLElement;
  const emailBorder = document.getElementById("email") as HTMLElement;

  const mainTooltip = document.getElementById("tooltip-main") as HTMLElement;

  const passwordBorder = document.getElementById("password") as HTMLElement;

  if (formErrors["emailOrId"]?.[0]) {
    emailTooltip?.classList.add("visible");
    emailBorder?.classList.add("error");
  } else {
    emailTooltip?.classList.remove("visible");
    emailBorder?.classList.remove("error");
  }
  if (formErrors["password"]?.[0]) {
    passwordBorder?.classList.add("error");
    emailBorder?.classList.remove("error");
    passwordBorder?.classList.add("error");
    mainTooltip?.classList.add("visible");
  } else {
    emailBorder?.classList.remove("error");
    passwordBorder?.classList.remove("error");
    mainTooltip?.classList.remove("visible");
  }
  if (invalidRes) {
    emailBorder?.classList.remove("error");
    passwordBorder?.classList.remove("error");
    mainTooltip?.classList.add("visible");
  } else {
    emailBorder?.classList.remove("error");
    passwordBorder?.classList.remove("error");
    mainTooltip?.classList.remove("visible");
  }

  function modalAppear() {
    const modalBox = document.getElementById("validation") as HTMLElement;

    modalBox.classList.add("visible");
    setTimeout(() => {
      modalBox.classList.remove("visible");
    }, 500);
  }
  function passwordCheck() {
    const characterlength = document.getElementById("length") as HTMLElement;
    const lowerCase = document.getElementById("lower") as HTMLElement;
    const upperCase = document.getElementById("upper") as HTMLElement;
    const numeric = document.getElementById("number") as HTMLElement;
    const specialChars = document.getElementById("specialChar") as HTMLElement;

    const number = new RegExp("(?=.*[0-9])");
    const length = new RegExp("(?=.{8,})");
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const specialChar = new RegExp(/[!@#$%^&*(),.?":{}|<>]/);

    number.test(password)
      ? numeric.classList.add("pass")
      : numeric.classList.remove("pass");

    lower.test(password)
      ? lowerCase.classList.add("pass")
      : lowerCase.classList.remove("pass");

    upper.test(password)
      ? upperCase.classList.add("pass")
      : upperCase.classList.remove("pass");

    length.test(password)
      ? characterlength.classList.add("pass")
      : characterlength.classList.remove("pass");
    
      specialChar.test(password) ? specialChars.classList.add("pass") : specialChars.classList.remove("pass")
  }

  return (
    <>
      <div className="big-box">
        <section className="left-box">
          <div className="top">
            <h2>A Git- Inspired Assignment submission system</h2>
            <p>
              Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.{" "}
            </p>
          </div>
          <div className="down">
            <img src="/Frame1.png" alt="login image" />
          </div>
        </section>
        <section className="right-box">
          <div className="box-outer">
            <form onSubmit={handleSubmit}>
              <div className="box-inner">
                <p className="form-title">Welcome back, Log in</p>
                <div className="tooltip-main" id="tooltip-main">
                  <div className="tooltip-main-content">
                    {invalidRes && <p>{invalidRes}</p>}
                  </div>
                </div>
                <div className="label-box">
                  <div className="email">
                    <label htmlFor="email">
                      <b>Email</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Email"
                      name="email"
                      required
                      className="email-enclosure"
                      id="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div className="tooltip-email" id="tooltip-email">
                    <div className="tooltip-email-content">
                      {formErrors["emailOrId"]?.[0] && (
                        <p>{formErrors["emailOrId"]?.[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="password">
                    <label htmlFor="password">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      name="psw"
                      required
                      className={
                        error === true
                          ? "password-enclosure error"
                          : "password-enclosure"
                      }
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      onKeyUp={() => {
                        passwordCheck();
                        modalAppear();
                      }}
                    />
                    <div className="validation" id="validation">
                      <ul>
                        <p className="caution">You password must contain:</p>
                        <li id="length">At least 8 Characters</li>
                        <li id="lower">Lower case letters (a-z)</li>
                        <li id="upper">Upper case letters (A-Z)</li>
                        <li id="number">Numbers (0-9)</li>
                        <li id="specialChar">Special Character</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button type="submit" className="login" id="login">
                  <p> Login </p>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginPage;
