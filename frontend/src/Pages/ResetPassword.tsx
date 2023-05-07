import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../ApiClient";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import { showSuccessMessage, showErrorMessage } from "../constants/messages";
import { StatusCodes } from "http-status-codes";

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

  const passwordView = (number: number) => {
    const passwordInput = document.querySelectorAll(
      "input"
    ) as NodeListOf<HTMLInputElement>;

    if (passwordInput[number].type === "password") {
      passwordInput[number].type = "text";
    } else {
      passwordInput[number].type = "password";
    }
  };

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
                    />
                    <img
                      src="/eye.png"
                      alt="password view toggle"
                      id="eye1"
                      onClick={() => {
                        passwordView(0);
                      }}
                    />
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
                      onClick={() => {
                        passwordView(1);
                      }}
                    />
                  </div>
                </div>

                <button className="btn">
                  <p>Reset Password</p>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
