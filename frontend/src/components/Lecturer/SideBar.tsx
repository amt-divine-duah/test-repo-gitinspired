import { useState } from "react";
import SignoutModal from "../SignoutModal";
import "/src/App.css";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    setLogout((prev) => !prev);
  };

  const ButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    const active = document.querySelectorAll(".active");
    active.forEach((item) => {
      item.classList.remove("active");
    });
    const draftActive = document.querySelectorAll(".draft-active");
    draftActive.forEach((item) => {
      item.classList.remove("draft-active");
    });
    const button = event.currentTarget;
    const page: string = event.currentTarget.classList[1];
    page === "drafts"
      ? button?.classList.add("draft-active")
      : button?.classList.add("active");
    navigate(`/${page}`);
  };
  return (
    <nav className="side-bar">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="pages">
        <div className=" page dashboard active" onClick={ButtonClick}>
          <p>Dashboard</p>
        </div>
        <div className="page students" onClick={ButtonClick}>
          <p>Student</p>
        </div>
        <div className="page submission" onClick={ButtonClick}>
          <p>Submission</p>
        </div>
        <div className="page drafts" onClick={ButtonClick}>
          <p>Draft</p>
        </div>
      </div>
      <div className="avatar">
        <img src={"/user 2.png"} alt="avatar" />
        <p>prince</p>
      </div>
      <div className="nav-logout" onClick={handleLogout}>
        <p>Logout</p>
      </div>
      {logout === true && <SignoutModal handleLogout={handleLogout} />}
    </nav>
  );
};

export default SideBar;
