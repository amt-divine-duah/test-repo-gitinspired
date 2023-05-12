import { useState } from "react";
import Searchbar from "../../components/Lecturer/Searchbar";
import ActionButton from "../../components/Lecturer/ActionButton";
import Table from "../../components/Table";
import useStudents from "../../hooks/useStudentData";
import LecturerMain from "../../components/LecturerMain";
const StudentTab = () => {
  const {students} = useStudents();
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  
  function handleAssignment() {
    setShowCreateAssignment((prev) => !prev);
  }
   
  function handleClick() {
    console.log("Hey");
  }
  return (
    <LecturerMain sidebar>
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
        <div className="student-page-view">
          <h2 className="page-header">All Students</h2>
          <div className="assignment-container">
            <Table userTableName={"Student ID"} data={students} />
          </div>
          <div>{/* pagewsitcher component */}</div>
        </div>
      </div>
    </LecturerMain>
  );
};

export default StudentTab;