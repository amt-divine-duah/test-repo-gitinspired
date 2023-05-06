import "../Styles/navbar.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SignoutModal from "./SignoutModal";
import { useAuthUser } from "react-auth-kit";

const NavBar = () => {
  const [logout, setLogout] = useState(false);
  const auth = useAuthUser();
  const handleLogout = () => {
    setLogout((prev) => !prev);
  };
  return (
    <header className="navbar">
      <div className="left-nav">
        <img src="/logo.png" alt="" />

        <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>
        <NavLink to={"/admin/student"}>Student</NavLink>
        <NavLink to={"/admin/lecturer"}>Lecturer</NavLink>
      </div>

      <div className="right-nav">
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
        <p>{auth()?.email}</p>
        <img src="/user 2.png" alt="" />
      </div>
      {logout === true && <SignoutModal handleLogout={handleLogout} />}
    </header>
  );
};

export default NavBar;
