import "../Styles/lecturerCreateAssignmentModal.scss";

import DropDown from "./DropDown";
import CustomDatePicker from "../components/CustomDatePicker";
import TextEditor from "./TextEditor";
import { useState } from "react";

type Prop = {
  handleShowAssignmentModal: React.MouseEventHandler;
};
const LecturerCreateNewAssignmentModal = ({
  handleShowAssignmentModal,
}: Prop) => {
  const [invitationInfo] = useState([
    {
      name: "Benstrong",
      email: "benstrong@amalitech.org",
    },
    {
      name: "Emmanuella Neizer",
      email: "emmanuellaneizer@amalitech.org",
    },
    {
      name: "Lisa-Marie Koomson",
      email: "lisa.marie@amalitech.org",
    },
    {
      name: "Francis Kay",
      email: "francis.kay@amalitech.org",
    },
    {
      name: "Clara Cartey",
      email: "claracartey@amalitech.org",
    },
    {
      name: "Abigail Barbie",
      email: "abigailbarbie@amalitech.org",
    },
    {
      name: "Joshuah Mensah",
      email: "joshuan.mensah@amalitech.org",
    },
  ]);
  const userInviteColor = ["#FFA9A9", "#A9EAFF", "#E9A9FF", "#FFA9A9"];
  return (
    <div
      className="create-assignment-modal-container"
      onClick={handleShowAssignmentModal}
    >
      <form className="assignment-modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <img src="" alt="" />
        </header>
        <div className="modal-content">
          <div className="modal-left-side">
            <h3>Create New Assignment</h3>

            <div className="modal-input-container">
              <p>Title</p>
              <DropDown />
            </div>

            <div className="modal-input-container">
              <p>Deadline</p>
              <CustomDatePicker />
            </div>
            <div className="modal-input-container">
              <p>Assignment Description</p>
            </div>
            <div className="text-editor">
              <TextEditor />
            </div>
            <div>
              <div className="modal-input-container">
                <p>Course</p>
              </div>

              <input
                type="text"
                name=""
                id=""
                placeholder="e.g introduction to programming"
              />
            </div>
            <div className="select-color"></div>
            <div className="buttons">
              <button>Save and Publish</button>
              <button>Save as draft</button>
            </div>
          </div>
          <div className="modal-middle-line"></div>
          <div className="modal-right-side">
            <h3>Invite Student</h3>
            <div className="invite-student-container">
              {invitationInfo.map((item, index) => (
                <div className="invite-student-card" key={index}>
                  <div
                    className="circle"
                    style={{
                      backgroundColor:
                        userInviteColor[index % userInviteColor.length],
                    }}
                  >
                    {item.name[0]}
                  </div>
                  <div className="user-name-and-email">
                    <label htmlFor="user">{item.name}</label>
                    <p>{item.email}</p>
                  </div>
                  <div className="user-check-box-container">
                    <input type="checkbox" id="user" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LecturerCreateNewAssignmentModal;
