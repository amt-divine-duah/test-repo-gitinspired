import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../ApiClient";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { showSuccessMessage, showErrorMessage } from "../constants/messages";
import { StatusCodes } from "http-status-codes";
import ValidationModal from "../components/ValidationModal";

interface FormErrors {
  password?: string[];
  confirmPassword?: string[];
}

const ResetPassword = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});


  const navigate = useNavigate();
  const { token } = useParams();

  const togglePasswordNew = () => {
    //  const passwordInput = document.querySelectorAll("input");
    const passwordInput = document.getElementById(
      "new-password"
    ) as HTMLInputElement;
    const passwordShowButton = document.getElementById("eye1");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const togglePasswordConfirm = () => {
    //  const passwordInput = document.querySelectorAll("input");
    const passwordInput = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;
    const passwwordShowButton = document.getElementById("eye2");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  function passwordCheck(password: string) {
    const characterlength = document.getElementById("length") as HTMLElement;
    const lowerCase = document.getElementById("lower") as HTMLElement;
    const upperCase = document.getElementById("upper") as HTMLElement;
    const numeric = document.getElementById("number") as HTMLElement;

    const number = new RegExp("(?=.*[0-9])");
    const length = new RegExp("(?=.{8,})");
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");

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
  }
  function modalAppear() {
    const modalBox = document.getElementById("validation") as HTMLElement;

    modalBox.classList.add("visible");
    setTimeout(() => {
      modalBox.classList.remove("visible");
    }, 900);
  }

  useEffect(() => {
    // TODO: Check if user is authenticated first
    (async () => {
      try {
        const response = await api.get(`/api/auth/confirm-account/${token}`);
        if (response.status === StatusCodes.OK) {
          showSuccessMessage("Please reset your password");
        }
        else {
          showErrorMessage("Something went wrong")
          navigate("auth/login")
        }
         return; 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage(error.response?.data["message"]);
        } else {
          showErrorMessage("Something went wrong");
        }
        navigate("/auth/login");
        // return
      }
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const password = passwordRef.current ? passwordRef.current.value : "";
      const confirmPassword = confirmPasswordRef.current ? confirmPasswordRef.current.value : "";
      const formData = {password, confirmPassword, token}
      const response = await api.post("api/auth/reset-password", formData);
      if (response.status === StatusCodes.OK) {
        showSuccessMessage(response.data?.message);
        navigate("/auth/login");
      }
      else {
       showErrorMessage(`Something went wrong`);
       navigate("/auth/login")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === StatusCodes.UNPROCESSABLE_ENTITY) {
          setFormErrors(error.response?.data["error"]);
        }
        else if (error.response?.status === StatusCodes.BAD_REQUEST) {
          setFormErrors({});
          showErrorMessage(`${error.response?.data["message"]}`);
        }
        else {
          setFormErrors({})
          showErrorMessage(`Something went wrong`);
        }
        return
      }
    }
  }

  if (formErrors["password"]?.[0]) {
    showErrorMessage(formErrors["password"]?.[0]);
  }
  else if (formErrors["confirmPassword"]?.[0]) {
    showErrorMessage(formErrors["confirmPassword"]?.[0]);
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
            <img src="/Frame.png" alt="login image" />
          </div>
        </section>
        <section className="right-box">
          <div className="box-outer">
            <form onSubmit={handleSubmit}>
              <div className="box-inner">
                <p className="form-title">Reset Passsword</p>

                <div className="label-box">
                  <div className="password">
                    <label htmlFor="password">
                      <b>New password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      name="newpassword"
                      required
                      className="password-enclosure"
                      id="new-password"
                      ref={passwordRef}
                      onKeyUp={(e) => {
                        e.currentTarget.value.length < 9 ? modalAppear() : "";
                        passwordCheck(e.currentTarget.value);
                      }}
                    />
                    <img
                      src="/eye.png"
                      alt="password view toggle"
                      id="eye1"
                      onClick={togglePasswordNew}
                    />
                    <ValidationModal />
                  </div>
                  <div className="password">
                    <label htmlFor="psw">
                      <b>Confirm Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      name="confirm password"
                      required
                      className="password-enclosure"
                      id="confirm-password"
                      ref={confirmPasswordRef}
                    />
                    <img
                      src="/eye.png"
                      alt="password view toggle"
                      id="eye2"
                      onClick={togglePasswordConfirm}
                    />
                  </div>
                </div>

                <button className="reset-btn">Reset Password</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
