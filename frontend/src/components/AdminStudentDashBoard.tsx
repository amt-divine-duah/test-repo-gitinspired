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
import { PaginationInfoInterface } from "../interfaces/PaginationInfoInterface";
import { StatusCodes } from "http-status-codes";

const AdminStudentDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [studentData, setStudentData] = useState<UserInterface[] | undefined | null>();
  const [paginationInfo, setPaginationInfo] = useState<
    PaginationInfoInterface | undefined
  >();

  const handleCreateUser = (newUser: UserInterface) => {
    setStudentData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [newUser];
      } else {
        return [newUser, ...prevData];
      }
    });
    setPaginationInfo((prevPagination: PaginationInfoInterface | undefined) => {
      if (prevPagination) {
        const currentPage = prevPagination.currentPage;
        const pageSize = prevPagination.pageSize;
        const totalItems = prevPagination.totalItems + 1;
        let pages = prevPagination.pages;
        const hasPrevious = currentPage > 1;
        pages = Math.ceil(totalItems / pageSize);

        return {
          ...prevPagination,
          currentPage: currentPage,
          pageSize: pageSize,
          totalItems: totalItems,
          pages: pages,
          hasNext: currentPage < pages,
          hasPrevious: hasPrevious,
        };
      }
      return prevPagination;
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
        const students = _.map(response.data?.data, (obj) =>
          _.pick(obj, keysToPick)
        ) as UserInterface[];
        setStudentData(students)
        setPaginationInfo(response.data?.paginationInfo);
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

  const loadNextPage = async () => {
    if (paginationInfo && studentData && paginationInfo.currentPage) {
      try {
        const response = await api.get("/api/admin/students", {
          params: {
            page: paginationInfo?.currentPage + 1,
          },
        });
        if (response.status === StatusCodes.OK) {
          const keysToPick = ["studentId", "firstName", "lastName", "email"];
          const students = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          setStudentData(students);
          setPaginationInfo(response.data?.paginationInfo);
        } else {
          showErrorMessage("Something went wrong");
          setStudentData(null);
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
        setStudentData(null);
      }
    }
  };

  // previous page
  const loadPrevPage = async () => {
    if (paginationInfo && studentData && paginationInfo.currentPage) {
      try {
        const response = await api.get("/api/admin/students", {
          params: {
            page: paginationInfo?.currentPage - 1,
          },
        });
        if (response.status === StatusCodes.OK) {
          const keysToPick = ["studentId", "firstName", "lastName", "email"];
          const students = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          setStudentData(students);
          setPaginationInfo(response.data?.paginationInfo);
        } else {
          showErrorMessage("Something went wrong");
          setStudentData(null);
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
        setStudentData(null);
      }
    }
  };

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
          paginationInfo={paginationInfo}
          loadNextPage={loadNextPage}
          loadPrevPage={loadPrevPage}
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
