import { useState } from "react";
import Searchbar from "../../components/Lecturer/Searchbar";
import ActionButton from "../../components/Lecturer/ActionButton";
import Table from "../../components/Table";
const StudentTab = () => {
  const [studentList] = useState([
    {
      id: "1234",
      name: "Benstrong",
      email: "benstrong@gamil.com",
    },
    {
      id: "1234",
      name: "Benstrong",
      email: "benstrong@gamil.com",
    },
  ]);
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
            <Table userTableName={"Student ID"} data={studentList} />
          </div>
          <div>
           {/* pagewsitcher component */}
          </div>
        </div>
      </div>
  );
};

export default StudentTab;