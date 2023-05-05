import "../App.css";
import  { useState } from "react";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
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
            <img src="./Frame.png" alt="login image" />
          </div>
        </section>
        <section className="right-box">
          <div className="box-outer">
            <form>
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
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                    <img
                      src="./eye.png"
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
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                    <img
                      src="./eye.png"
                      alt="password view toggle"
                      id="eye2"
                      onClick={() => {
                        passwordView(1);
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn">
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

export default ResetPassword;
