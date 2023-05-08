import "../App.css";

const ResetPassword = () => {

     const togglePasswordNew= ()  => {
    //  const passwordInput = document.querySelectorAll("input");
    const passwordInput = document.getElementById('new-password');
     const passwordShowButton = document.getElementById('eye1');
 
     if(passwordInput.type === 'password') {
        passwordInput.type = 'text';
     }else {
        passwordInput.type = 'password';
     }
     }
     const togglePasswordConfirm= ()  => {
        //  const passwordInput = document.querySelectorAll("input");
        const passwordInput = document.getElementById('confirm-password');
         const passwwordShowButton = document.getElementById('eye2');

         if(passwordInput.type === 'password') {
            passwordInput.type = 'text'
         }else {
            passwordInput.type = 'password';
         }
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
            <img src='./Frame.png' alt="login image" />
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
                      id='new-password'
                    />
                    <img src='./eye.png' alt="password view toggle" id="eye1" onClick={togglePasswordNew}/>
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
                      id='confirm-password'
                    />
                        <img src='./eye.png' alt="password view toggle" id="eye2" onClick={togglePasswordConfirm}/>
                  </div>
                </div>

                <button type="submit" className="btn">
                  <p> Reset Password </p>
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
