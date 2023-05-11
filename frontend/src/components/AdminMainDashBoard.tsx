import "../Styles/admin-main-dashboard.scss";
const AdminMainDashBoard = () => {
  return (
    <div className="admin-main-dashboard-route">
      <div className="left-admin-dashboard">
        <div className="left-admin-dashboard-top">
          <div className="admin-dashboard-header">
            <div className="admin-header-text">
              <h1>Welcome back, Ella</h1>
              <p>
                Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </p>
            </div>
            <div className="admin-header-image">
              <img src="/desktop-guy.svg" alt="" />
            </div>
          </div>
          <div className="overview">Overview</div>
            <div className="overview-content">
              <div className="overview-cards">
                <div className="overview-image">
                    <img src="" alt="" />
                </div>
                <div className="overview-text">
                <h4>178+</h4>
                <p>Lecturers</p>
                </div>
                
              </div>
            </div>

         </div> 
          <div className="left-admin-dashboard-down">
            
            <div className="students-progress">Student Progress</div>
            <div className="student-progress-graph">
              <img src="/Chart.png" alt="" />
            </div>
          </div>
        </div>
        <div className="right-admin-dashboard">
            <div className="right-admin-dashboard-top">
                <h3>Notifications</h3>
                <div className="notification-card-info">
                    <p>You have a bug that needs to b..</p>
                    <p>Just now</p>
                </div>
            </div>

            <div className="right-admin-dashboard-down">
                <h6>Assignment status</h6>
               
            </div>
        </div>
      </div>
  );
};

export default AdminMainDashBoard;
