import "../Styles/admin-main-dashboard.scss";
import { useEffect, useState } from "react";
import Main from "./Main";
import { CircularProgress } from "@mui/joy";
import api from "../ApiClient";
import { showErrorMessage } from "../constants/messages";
const AdminMainDashBoard = () => {
  const [data, setData] = useState<boolean | undefined>(false);
  const [assignmentCount, setAssignmnentCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [lecturerCount, setLecturerCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);

  const [studentData] = useState([
    {
      name: "kofi",
      dueDate: "June 24,22",
      status: false,
    },
    {
      name: "john",
      dueDate: "June 24,22",
      status: true,
    },
    {
      name: "luke",
      dueDate: "June 24,22",
      status: false,
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const assignments = await api.get("/api/admin/assignments");
        const submissions = await api.get("/api/admin/submissions");
        const students = await api.get("/api/admin/students");
        const lecturers = await api.get("/api/admin/lecturers");
        setAssignmnentCount(assignments.data?.data.length);
        setSubmissionCount(submissions.data?.data.length);
        setLecturerCount(lecturers.data?.paginationInfo["totalItems"]);
        setStudentCount(students.data?.paginationInfo["totalItems"])
        setData(true);
        return
      } catch (error) {
        showErrorMessage("Something went wrong");
        setData(undefined);
        return
      }
    })();
  }, []);

  let contents;
  if (data === false) {
    contents = (
      <div className="landingPage">
        <CircularProgress size="lg" />
      </div>
    );
  } else if (data === undefined) {
    contents = <p>Could not load data</p>;
  } else {
    contents = (
      <Main header>
        <div className="admin-main-dashboard-route">
          <div className="left-admin-dashboard">
            <div className="left-admin-dashboard-top">
              <div className="admin-dashboard-header">
                <div className="admin-header-text">
                  <h1>Welcome back, Admin</h1>
                  <p>
                    Morem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis. Class aptent taciti sociosqu ad litora torquent per
                    conubia nostra, per inceptos himenaeos.
                  </p>
                </div>
                <div className="admin-header-image">
                  <img src="/desktop-guy.svg" alt="" />
                </div>
              </div>
              <div className="overview">Overview</div>

              <div className="overview-content">
                {/* Lecturers */}
                <div className="overview-cards">
                  <div>
                    <div className="overview-image">
                      <div>
                        <img src="/student-icon.svg" alt="lecturer-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="overview-text">
                    <h4>
                      {lecturerCount > 200
                        ? `${lecturerCount}K`
                        : `${lecturerCount}`}
                    </h4>
                    <p>Lecturers</p>
                  </div>
                </div>
                {/* Students */}
                <div className="overview-cards">
                  <div>
                    <div className="overview-image">
                      <div>
                        <img src="/student-icon.svg" alt="student-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="overview-text">
                    <h4>
                      {studentCount > 200
                        ? `${studentCount}K`
                        : `${studentCount}`}
                    </h4>
                    <p>Students</p>
                  </div>
                </div>
                {/* Assignments Created */}
                <div className="overview-cards">
                  <div>
                    <div className="overview-image">
                      <div>
                        <img
                          src="/assignment-created-icon.svg"
                          alt="assignment-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overview-text">
                    <h4>
                      {assignmentCount > 200
                        ? `${assignmentCount}K`
                        : `${assignmentCount}`}
                    </h4>
                    <p>Assignment created</p>
                  </div>
                </div>
                {/* Submissions Made */}
                <div className="overview-cards">
                  <div>
                    <div className="overview-image">
                      <div>
                        <img
                          src="/ic-job application.svg"
                          alt="submission-icon"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overview-text">
                    <h4>
                      {submissionCount > 200
                        ? `${submissionCount}K`
                        : `${submissionCount}`}
                    </h4>
                    <p>Submissions made</p>
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
                  {studentData.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.dueDate}</td>
                      <td className={item.status === true ? "green" : "blue"}>
                        <div
                          className={
                            item.status === true ? "completed" : "in-progress"
                          }
                        ></div>
                        {item.status === true ? "completed" : "In progress"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Main>
    );
  }
  return <>{contents}</>;
};

export default AdminMainDashBoard;
