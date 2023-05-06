import { useSignOut } from "react-auth-kit";
import "../Styles/signOutModal.scss";
import { useNavigate } from "react-router-dom";

type Prop = {
  handleLogout: React.MouseEventHandler;
};

const SignoutModal = ({ handleLogout }: Prop) => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/auth/login");
  }

  return (
    <div className="container" onClick={handleLogout}>
      <div className="signOutModal" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm Logout</h3>
        <p>
          Are you sure you want to logout from{" "}
          <span className="logoutBoldText">Assign IT Dashboard?</span>
        </p>
        <div className="logout-btns">
          <button onClick={handleLogout}>Cancel</button>
          <button onClick={handleSignOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SignoutModal;
