import { useEffect, useState } from "react";
import ActionButton from "../../components/Lecturer/ActionButton";
import AssignmentCard from "../../components/Lecturer/AssignmentCard";
import Searchbar from "../../components/Lecturer/Searchbar";
import useData from "../../hooks/useAssignmentData";
import LecturerCreateNewAssignmentModal from "../../LecturerDashBoardComponents/LecturerCreateNewAssignmentModal";
import api from "../../ApiClient";

Searchbar;
const DashboardTab = () => {
  const {assignments} = useData();
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  function handleClick() {
    console.log("Hey")
  }

  function handleAssignment() {
     setShowCreateAssignment((prev) => !prev);
  }

  function onCreateAssignment() {
    console.log("assignment done")
    setShowCreateAssignment((prev) => !prev);
  }

  useEffect(() => {
    (async () => {
      const lecturer = await api.get("/api/admin/lecturers")
    })()
  }, [])

  return (
    <div className="main-content">
      <div className="page-features">
        <Searchbar />
        <div className="header-right">
          <ActionButton
            class={"action filter"}
            name={"filter by date"}
            handleClick={handleClick}
          />
          <ActionButton
            class={"action assign"}
            name={"assignment +"}
            handleClick={handleAssignment}
          />
        </div>
      </div>
      <div>
        <h2 className="page-header">Assignment</h2>
        <div className="assignment-container">
          {assignments.map((item, index) => {
            return (
              <AssignmentCard
                title={item.title}
                description={item.description}
                date={item.date}
                uniqueCode={item.code}
              />
            );
          })}
        </div>
      </div>
      {showCreateAssignment === true && (
        <LecturerCreateNewAssignmentModal
          handleShowAssignmentModal={handleAssignment}
          onCreateAssignment={onCreateAssignment}
        />
      )}
    </div>
  );
};

export default DashboardTab;
