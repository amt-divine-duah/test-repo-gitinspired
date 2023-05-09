import { NavLink } from "react-router-dom";
import "../Styles/sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="img">
          {" "}
          <img src="/logo.png" alt="" />
        </div>
        <ul>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to={"/students"}>Student</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to={"/submission"}>Submission</NavLink>
          </li>
          <li>
            <NavLink to={"/draft"}>Draft</NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <div className="profile-pic-with-name">
          <img src="/user 2.png" alt="" />
          <p>Prince</p>
        </div>

        <button>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
