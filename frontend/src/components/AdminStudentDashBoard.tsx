import { useEffect, useState } from "react";
import "../Styles/admin-student.scss";
import Board from "./Board";
import CreateUserModal from "./CreateUserModal";
import UploadModal from "./UploadModal";
import Main from "./Main";
import { UserInterface } from "../interfaces/UserInterface";
import api from "../ApiClient";
import axios from "axios";
import { showErrorMessage } from "../constants/messages";
import _ from "lodash";

const AdminStudentDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentData, setStudentData] = useState<UserInterface[]>([]);

  const handleCreateUser = (newUser: UserInterface) => {
    setStudentData((prevData) => [newUser, ...prevData,]);
    setShowCreateUserModal((prev) => !prev);
  };

  const handleShowCreateUserModal = () => {
    setShowCreateUserModal((prev) => !prev);
  };

  const handleUploadModal = () => {
    setShowUploadModal((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/api/admin/students");
        const keysToPick = ["studentId", "firstName", "lastName", "email"];
        const student = _.map(response.data?.data, (obj) => _.pick(obj, keysToPick)) as UserInterface[];
        setStudentData(student)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage("Something went wrong");
        }
      }
    })();
  }, []);

  return (
    <Main header>
      <div className="admin-student">
        <Board
          users="Students"
          buttonInfo="Add new Student"
          message="Oops, no students created or uploaded yet. Click on any of the buttons above to get started"
          showAddUserModal={handleShowCreateUserModal}
          showUploadModal={handleUploadModal}
          data={studentData}
          userTableName="Student ID"
        />
        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user="student"
            onCreateUser={handleCreateUser}
          />
        )}
        {showUploadModal === true && (
          <UploadModal showUploadModal={handleUploadModal} />
        )}
      </div>
    </Main>
  );
};

export default AdminStudentDashBoard;
