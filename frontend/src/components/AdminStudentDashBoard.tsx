import { useEffect, useState } from "react";
import "../Styles/admin-student.scss";
import Board from "./Board";
import CreateUserModal from "./CreateUserModal";
import UploadModal from "./UploadModal";
import Main from "./Main";
import { UserInterface } from "../interfaces/UserInterface";
import axios from "axios";
import _ from "lodash";
import api from "../ApiClient";
import { showErrorMessage } from "../constants/messages";

const AdminStudentDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentData, setStudentData] = useState<UserInterface[] | undefined | null>();

  const handleCreateUser = (newUser: UserInterface) => {
    setStudentData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [newUser];
      } else {
        return [newUser, ...prevData];
      }
    });
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
        const lecturers = _.map(response.data?.data, (obj) =>
          _.pick(obj, keysToPick)
        ) as UserInterface[];
        setStudentData(lecturers)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage("Something went wrong");
          setStudentData(null);
        }
        else {
          showErrorMessage("Something went wrong");
          setStudentData(null);
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
          data={studentData && studentData}
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
