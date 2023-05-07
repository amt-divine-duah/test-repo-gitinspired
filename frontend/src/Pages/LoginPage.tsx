import "../App.css";
import { useState } from "react";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function buttonClick() {
    const emailTooltip = document.getElementById(
      "tooltip-email"
    ) as HTMLElement;
    const emailBorder = document.getElementById("email") as HTMLElement;

    const mainTooltip = document.getElementById("tooltip-main") as HTMLElement;

    const passwordBorder = document.getElementById("password") as HTMLElement;

    if (email.length < 8) {
      emailTooltip?.classList.add("visible");
      emailBorder?.classList.add("error");
    } else {
      emailTooltip?.classList.remove("visible");
      emailBorder?.classList.remove("error");
    }

    if (password.length < 8) {
      emailBorder?.classList.add("error");
      passwordBorder?.classList.add("error");
      mainTooltip?.classList.add("visible");
    } else {
      emailBorder?.classList.remove("error");
      passwordBorder?.classList.remove("error");
      mainTooltip?.classList.remove("visible");
    }
  }
  function handleSubmit(event: React.MouseEvent) {
    event.preventDefault();
  }

 function modalAppear () {
    const modalBox = document.getElementById(
        "validation"
      ) as HTMLElement;
    
      modalBox.classList.add('visible');
      setTimeout(()=> {
        modalBox.classList.remove('visible');
      },900)
 
 }
  function passwordCheck(){

    const characterlength = document.getElementById(
        "length"
      ) as HTMLElement;
      const lowerCase = document.getElementById(
        "lower"
      ) as HTMLElement;
      const upperCase = document.getElementById(
        "upper"
      ) as HTMLElement;
      const numeric = document.getElementById(
        "number"
      ) as HTMLElement;

    const number = new RegExp('(?=.*[0-9])');
    const length = new RegExp('(?=.{8,})');
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');

    // data.isBookmarked ? (
    //     <IsTicked data={"trending-bookmark"} />
    //   ) : (
    //     <NotTicked data={"trending-bookmark"} />
    //   )}
    number.test(password) ? numeric.classList.add('pass') : numeric.classList.remove('pass');
  
    lower.test(password) ? lowerCase.classList.add('pass') : lowerCase.classList.remove('pass');

    upper.test(password) ? upperCase.classList.add('pass') : upperCase.classList.remove('pass');
   
    length.test(password) ? characterlength.classList.add('pass') : characterlength.classList.remove('pass');

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
            <img src="./Frame1.png" alt="login image" />
          </div>
        </section>
        <section className="right-box">
          <div className="box-outer">
            <form onSubmit={()=>handleSubmit}>
              <div className="box-inner">
                <p className="form-title">Welcome back, Log in</p>
                <div className="tooltip-main" id="tooltip-main">
                  <div className="tooltip-main-content">
                    <p>email and password incorrect</p>
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
                      <p>please enter correct email address</p>
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
                      className="password-enclosure"
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}

                      onKeyUp={() => {
                        passwordCheck();
                        password.length < 11 ? modalAppear() : '';
                      }}
                    />
                    <div className="validation"
                    id="validation">
                      <ul>
                        <p className="caution">You password must contain:</p>
                        <li id="length">At least 8 Characters</li>
                        <li id="lower">Lower case letters (a-z)</li>
                        <li id="upper">Upper case letters (A-Z)</li>
                        <li id="number">Numbers (0-9)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="login"
                  id="login"
                  onClick={() => {
                    buttonClick();
                  }}
                >
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