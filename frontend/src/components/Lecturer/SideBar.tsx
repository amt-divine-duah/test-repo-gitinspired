import "/src/App.css"
const SideBar = () => {
    return (
      <nav className="side-bar">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="pages">
          <div className=" page dashboard active">
            <p>Dashboard</p>
          </div>
          <div className="page student">
            <p>Student</p>
          </div>
          <div className="page submission">
            <p>Submission</p>
          </div>
          <div className="page draft">
            <p>Draft</p>
          </div>
        </div>
        <div className="avatar">
          <img src={"/user 2.png"} alt="avatar" />
          <p>prince</p>
        </div>
        <div className="nav-logout">
          <p>Logout</p>
        </div>
      </nav>
    );
  };
  
  export default SideBar;
  