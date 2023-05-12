import "../Styles/admin-main-dashboard.scss";
import { useState } from "react";
const AdminMainDashBoard = () => {
  const [cardInfo] = useState([
    {
      img: "/student-icon.svg",
      count: "178+",
      info: "Lecturers",
    },
    {
      img: "/student-icon.svg",
      count: "20+",
      info: "Students",
    },
    {
      img: "/assignment-created-icon.svg",
      count: "190+",
      info: "Assignment created",
    },
    {
      img: "ic-job application.svg",
      count: "12+",
      info: "Submissions made",
    },
  ]);

  const [studentData]=useState([
    {
        name:'kofi',
        dueDate:'June 24,22',
        status:false,
    },
    {
        name:'john',
        dueDate:'June 24,22',
        status: true,
    },
    {
        name:'luke',
        dueDate:'June 24,22',
        status:false,
    }
  ])
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
            {cardInfo.map((item, index) => (
              <div className="overview-cards" key={index}>
                <div>
                  <div className="overview-image">
                    <div>
                      <img src={item.img} alt="" />
                    </div>
                  </div>
                </div>

                <div className="overview-text">
                  <h4>{item.count}</h4>
                  <p>{item.info}</p>
                </div>
              </div>
            ))}
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
          <h4>Notifications</h4>
          <div className="notification-card-info">
            <p>
              <img src="/user 2.png"></img>You have a bug that needs to b..
            </p>
            <p>Just now</p>
          </div>
        </div>

        <div className="right-admin-dashboard-down">
          <h4>Assignment status</h4>
         
          <table>
            <thead>
              <tr>
                <th>Students</th>
                <th>Due date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {
            studentData.map((item)=>(
                <tr>
                <td>{item.name}</td>
                <td>{item.dueDate}</td>
                <td className={item.status===true?'green':'blue'}>
                  <div className={item.status===true?'completed':'in-progress'}></div>
                  {item.status===true ? 'completed':'In progress'}
                </td>
              </tr>
            ))
          }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMainDashBoard;
