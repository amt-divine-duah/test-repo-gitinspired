import "../App.css";
import ValidationModal from "../components/ValidationModal";

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

     function passwordCheck(password: string) {
          const characterlength = document.getElementById('length') as HTMLElement;
          const lowerCase = document.getElementById('lower') as HTMLElement;
          const upperCase = document.getElementById('upper') as HTMLElement;
          const numeric = document.getElementById('number') as HTMLElement;
      
          const number = new RegExp('(?=.*[0-9])');
          const length = new RegExp('(?=.{8,})');
          const lower = new RegExp('(?=.*[a-z])');
          const upper = new RegExp('(?=.*[A-Z])');
      
          number.test(password) ? numeric.classList.add('pass') : numeric.classList.remove('pass');
      
          lower.test(password) ? lowerCase.classList.add('pass') : lowerCase.classList.remove('pass');
      
          upper.test(password) ? upperCase.classList.add('pass') : upperCase.classList.remove('pass');
      
          length.test(password)
              ? characterlength.classList.add('pass')
              : characterlength.classList.remove('pass');
      }
   function modalAppear() {
        const modalBox = document.getElementById('validation') as HTMLElement;
    
        modalBox.classList.add('visible');
        setTimeout(() => {
            modalBox.classList.remove('visible');
        }, 900);
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
                      onKeyUp={(e) => {
                        e.currentTarget.value.length < 9 ? modalAppear() : "";
                        passwordCheck(e.currentTarget.value);
                      }}
                    />
                    <img src='./eye.png' alt="password view toggle" id="eye1" onClick={togglePasswordNew}/>
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
