import Board from "./Board";
import { useEffect, useState } from "react";
import CreateUserModal from "./CreateUserModal";
import UploadModal from "./UploadModal";
import "../Styles/admin-leturer.scss";
import Main from "./Main";
import { UserInterface } from "../interfaces/UserInterface";
import api from "../ApiClient";
import _ from "lodash";
import { showErrorMessage } from "../constants/messages";
import axios from "axios";
import { PaginationInfoInterface } from "../interfaces/PaginationInfoInterface";
import { StatusCodes } from "http-status-codes";

const AdminLecturerDashBoard = () => {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [lecturersData, setLecturersData] = useState<
    UserInterface[] | undefined | null
  >();
  const [paginationInfo, setPaginationInfo] = useState<
    PaginationInfoInterface | undefined
  >();

  const handleCreateUser = (newUser: UserInterface) => {
    setLecturersData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [newUser];
      } else {
        return [newUser, ...prevData];
      }
    });
    setPaginationInfo((prevPagination: PaginationInfoInterface | undefined) => {
      if (prevPagination) {
        const currentPage = prevPagination.currentPage
        const pageSize = prevPagination.pageSize
        const totalItems = prevPagination.totalItems + 1
        let pages = prevPagination.pages
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

  function handleBulkUpload(newUsers: UserInterface[]) {
    setLecturersData((prevData) => {
      if (prevData === undefined || prevData === null) {
        return [...newUsers];
      } else {
        return [...newUsers, ...prevData];
      }
    });
    setPaginationInfo((prevPagination: PaginationInfoInterface | undefined) => {
      if (prevPagination) {
        const currentPage = prevPagination.currentPage;
        const pageSize = prevPagination.pageSize;
        const totalItems = prevPagination.totalItems + newUsers.length;
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
    setShowUploadModal((prev) => !prev);
  }

  function handleHideModal() {
    setShowUploadModal((prev) => !prev);
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/api/admin/lecturers");
        const keysToPick = ["staffId", "firstName", "lastName", "email"];
        const lecturers = _.map(response.data?.data, (obj) =>
          _.pick(obj, keysToPick)
        ) as UserInterface[]; 
        const new = [...lecturers]
        setLecturersData(lecturers);

        setPaginationInfo(response.data?.paginationInfo);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage("Something went wrong");
          setLecturersData(null);
        } else {
          showErrorMessage("Something went wrong");
          setLecturersData(null);
        }
      }
    })();
  }, []);

  // handle pagination (next page)
  const loadNextPage = async () => {
    if (paginationInfo && lecturersData && paginationInfo.currentPage) {
      try {
        const response = await api.get("/api/admin/lecturers", {
          params: {
            page: paginationInfo?.currentPage + 1,
          },
        });
        if (response.status === StatusCodes.OK) {
          const keysToPick = ["staffId", "firstName", "lastName", "email"];
          const lecturers = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          setLecturersData(lecturers);
          setPaginationInfo(response.data?.paginationInfo);
        } else {
          showErrorMessage("Something went wrong");
          setLecturersData(null);
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
        setLecturersData(null);
      }
    }
  };

  // previous page
  const loadPrevPage = async () => {
    if (paginationInfo && lecturersData && paginationInfo.currentPage) {
      try {
        const response = await api.get("/api/admin/lecturers", {
          params: {
            page: paginationInfo?.currentPage - 1,
          },
        });
        if (response.status === StatusCodes.OK) {
          const keysToPick = ["staffId", "firstName", "lastName", "email"];
          const lecturers = _.map(response.data?.data, (obj) =>
            _.pick(obj, keysToPick)
          ) as UserInterface[];
          setLecturersData(lecturers);
          setPaginationInfo(response.data?.paginationInfo);
        } else {
          showErrorMessage("Something went wrong");
          setLecturersData(null);
        }
      } catch (error) {
        showErrorMessage("Something went wrong");
        setLecturersData(null);
      }
    }
  };

  return (
    <Main header>
      <div className="admin-lecturer-board">
        <Board
          users="Lecturers"
          buttonInfo="Add new Lecturer"
          message="Oops, no lecturer created or uploaded yet. Click on any of the buttons above to get started"
          showAddUserModal={handleShowCreateUserModal}
          showUploadModal={handleUploadModal}
          data={lecturersData && lecturersData}
          userTableName="Staff ID"
          paginationInfo={paginationInfo}
          loadNextPage={loadNextPage}
          loadPrevPage={loadPrevPage}
        />
        {showCreateUserModal === true && (
          <CreateUserModal
            showModal={handleShowCreateUserModal}
            user="lecturer"
            onCreateUser={handleCreateUser}
          />
        )}
        {showUploadModal === true && (
          <UploadModal
            showUploadModal={handleUploadModal}
            user="lecturer"
            onBulkUpload={handleBulkUpload}
            hideModal={handleHideModal}
          />
        )}
      </div>
    </Main>
  );
};

export default AdminLecturerDashBoard;
