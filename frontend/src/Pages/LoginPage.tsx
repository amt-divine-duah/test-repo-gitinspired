
import "../App.css";

const LoginPage = () => {
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
            <img src='./Frame1.png' alt="login image" />
          </div>
        </section>
        <section className="right-box">
          <div className="box-outer">
            <form>
              <div className="box-inner">
                <p className="form-title">Welcome back, Log in</p>
                <div
                  className="tooltip-main"
                  data-message="email or password incorrect"
                ></div>
                <div className="label-box">
                  <div className="email">
                    <label htmlFor="email">
                      <b>Email/ID</b>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Email or ID"
                      name="email"
                      required
                      className="email-enclosure"
                    />
                  </div>
                
                    <div
                      className="tooltip"
                      data-message="Please enter correct email address"
                    ></div>
                  
                 

                  <div className="password">
                    <label htmlFor="psw">
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      name="psw"
                      required
                      className="password-enclosure"
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

export default LoginPage;

