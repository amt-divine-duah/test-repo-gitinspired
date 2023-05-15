import "../Styles/lecturerCreateAssignmentModal.scss";
import "../Styles/customDatePicker.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import api from "../ApiClient";
import { StatusCodes } from "http-status-codes";
import { showErrorMessage, showSuccessMessage } from "../constants/messages";
import { useAuthUser } from "react-auth-kit";

type Prop = {
  handleShowAssignmentModal: React.MouseEventHandler;
  onCreateAssignment: any;
  onDraftAssignment: any
};
const LecturerCreateNewAssignmentModal = ({
  handleShowAssignmentModal,
  onCreateAssignment,
  onDraftAssignment
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
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<UserInterface[]>();
  const titleRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const auth = useAuthUser();
  const editorStyle = {
    height: "7rem",
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  async function handleDraftSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const description = value;
    const title = titleRef.current ? titleRef.current.value : "";
    const deadline = deadlineRef.current ? deadlineRef.current.value : "";

    console.log(title);
    console.log(deadline);
    console.log("This is value", description, selectedUsers);

    const formData = {
      title: title,
      description: description,
      course: title,
      deadline: deadline,
      createdBy: auth()?.loginId,
      publish: false,
      students: selectedUsers,
    };

    console.log("This is forData", formData);
    try {
      const response = await api.post(
        "/api/lecturer/create-assignment",
        formData
      );
      if (response.status === StatusCodes.OK) {
        showSuccessMessage("Draft assigment created");
        onDraftAssignment(response.data?.data);
      }
    } catch (error) {
      showErrorMessage("Something went wrong");
      return;
    }
  }

  async function handleFinalSubmit() {
    const description = value;
    const title = titleRef.current ? titleRef.current.value : "";
    const deadline = deadlineRef.current ? deadlineRef.current.value : "";

    console.log(title);
    console.log(deadline);
    console.log("This is value", description, selectedUsers);

    const formData = {
      title: title,
      description: description,
      course: title,
      deadline: deadline,
      createdBy: auth()?.loginId,
      publish: true,
      students: selectedUsers,
    };

    console.log("This is forData", formData);
    try {
      const response = await api.post(
        "/api/lecturer/create-assignment",
        formData
      );
      if (response.status === StatusCodes.OK) {
        showSuccessMessage(response.data?.message);
        console.log(response.data?.data, "I am done");
        onCreateAssignment(response.data?.data);
      }
    } catch (error) {
      showErrorMessage("Something went wrong");
      return;
    }
  }


  useEffect(() => {
    (async () => {
      const response = await api.get("/api/lecturer/students");
      const users = response.data?.data;
      setUsers(users);
    })();
  }, []);
  console.log("This is users", users);
  return (
    <div
      className="create-assignment-modal-container"
      onClick={handleShowAssignmentModal}
    >
      <form
        className="assignment-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleDraftSubmit}
      >
        <header>
          <img src="" alt="" />
        </header>
        <div className="modal-content">
          <div className="modal-left-side">
            <h3>Create New Assignment</h3>

            <div>
              <div className="modal-input-container">
                <p>Title</p>
              </div>

              <input
                type="text"
                name=""
                id=""
                placeholder="e.g introduction to programming"
                ref={titleRef}
              />
            </div>

            <div className="modal-input-container">
              <p>Deadline</p>
              <div className="customDatePicker">
                <input
                  type="text"
                  id="date"
                  ref={deadlineRef}
                  placeholder="dd/mm/yyyy"
                  onFocus={() => (deadlineRef.current.type = "date")}
                />
              </div>
            </div>
            <div className="modal-input-container">
              <p>Assignment Description</p>
            </div>
            <div className="test-editor">
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>

            <div className="buttons">
              <button type="button" onClick={handleFinalSubmit}>Save and Publish</button>
              <button type="submit">Save as draft</button>
            </div>
          </div>
          <div className="modal-middle-line"></div>
          <div className="modal-right-side">
            <h3>Invite Student</h3>
            <div className="invite-student-container">
              {users?.map((user, index) => (
                <div className="invite-student-card" key={index}>
                  <div
                    className="circle"
                    style={{
                      backgroundColor:
                        userInviteColor[index % userInviteColor.length],
                    }}
                  >
                    {user.firstName.charAt(0)}
                  </div>
                  <div className="user-name-and-emal">
                    <label htmlFor={user.firstName}>{user.firstName}</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="user-check-box-container">
                    <input
                      type="checkbox"
                      id={user.studentId}
                      checked={selectedUsers.includes(user.studentId ?? "")}
                      onChange={() =>
                        handleCheckboxChange(user.studentId ?? "")
                      }
                    />
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
