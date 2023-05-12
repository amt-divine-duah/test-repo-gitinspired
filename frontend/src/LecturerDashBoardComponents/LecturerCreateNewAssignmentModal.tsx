import "../Styles/lecturerCreateAssignmentModal.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import api from "../ApiClient";
import { UserInterface } from "../interfaces/UserInterface";
import { useAuthUser } from "react-auth-kit";
import { showErrorMessage, showSuccessMessage } from "../constants/messages";
import { StatusCodes } from "http-status-codes";

type Prop = {
  handleShowAssignmentModal: React.MouseEventHandler;
  onCreateAssignment: any
};
const LecturerCreateNewAssignmentModal = ({
  handleShowAssignmentModal,
  onCreateAssignment,
}: Prop) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<UserInterface[]>();
  const titleRef = React.useRef<HTMLInputElement>(null);
  const deadlineRef = React.useRef<HTMLInputElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const auth = useAuthUser();

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("How do I");
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
        onCreateAssignment();
      }
    } catch (error) {
      showErrorMessage("Something went wrong");
      return
    }
  }

  useEffect(() => {
    (async () => {
      const response = await api.get("/api/admin/students");
      const users = response.data?.data;
      setUsers(users);
    })();
  }, []);

  return (
    <div
      className="create-assignment-modal-container"
      onClick={handleShowAssignmentModal}
    >
      <form
        className="assignment-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <header>
          <img src="" alt="" />
        </header>
        <div className="modal-content">
          <div className="modal-left-side">
            <h3>Create New Assignment</h3>
            <label htmlFor="title">Title</label>
            <div className="modal-input-container">
              <input
                type="text"
                id="title"
                placeholder="e.g.  Javascript"
                ref={titleRef}
              />
              <img src="" alt="" />
            </div>

            <label htmlFor="deadline">Deadline</label>
            <div className="modal-input-container">
              <input
                type="date"
                id="deadline"
                placeholder="dd/mm/yyyy"
                ref={deadlineRef}
              />
              <img src="" alt="" />
            </div>

            <p>Assignment Description</p>

            <div className="test-editor">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
            <div className="buttons">
              <button>Save and Publish</button>
              <button>Save as draft</button>
            </div>
          </div>
          <div className="modal-middle-line"></div>
          <div className="modal-right-side">
            <h3>Invite Student</h3>
            {users?.map((user) => (
              <div className="invite-student-card" key={user.id}>
                <div className="circle">{user.firstName.charAt(0)}</div>
                <div className="user-name-and-emal">
                  <label htmlFor={user.firstName}>{user.firstName}</label>
                  <p>{user.email}</p>
                </div>
                <div className="user-check-box-container">
                  <input
                    type="checkbox"
                    id={user.id}
                    checked={selectedUsers.includes(user.id ?? "")}
                    onChange={() => handleCheckboxChange(user.id ?? "")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LecturerCreateNewAssignmentModal;
