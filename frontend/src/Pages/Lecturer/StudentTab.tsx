import { useState } from "react";
import Searchbar from "../../components/Lecturer/Searchbar";
import ActionButton from "../../components/Lecturer/ActionButton";
import Table from "../../components/Table";
import useStudents from "../../hooks/useStudentData";
const StudentTab = () => {
  const {students} = useStudents();
  return (
      <div className="main-content">
        <div className="page-features">
          <Searchbar />
          <div className="header-right">
          <ActionButton class={"action filter"} name={"filter by date"} />
          <ActionButton class={"action assign"} name={"assignment +"} />
          </div>
        </div>
        <div className="student-page-view">
          <h2 className="page-header">All Students</h2>
          <div className="assignment-container">
            <Table userTableName={"Student ID"} data={students} />
          </div>
          <div>
           {/* pagewsitcher component */}
          </div>
        </div>
      </div>
  );
};

export default StudentTab;