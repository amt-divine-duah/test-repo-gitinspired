import { useState } from "react";
import ActionButton from "../../components/Lecturer/ActionButton";
import AssignmentCard from "../../components/Lecturer/AssignmentCard";
import Searchbar from "../../components/Lecturer/Searchbar";
import useData from "../../hooks/useAssignmentData";

Searchbar;
const DashboardTab = () => {
  const {assignments} = useData();
  return (
    <div className="main-content">
      <div className="page-features">
        <Searchbar />
        <div className="header-right">
          <ActionButton class={"action filter"} name={"filter by date"} />
          <ActionButton class={"action assign"} name={"assignment +"} />
        </div>
      </div>
      <div>
        <h2 className="page-header">Assignment</h2>
        <div className="assignment-container">

        { assignments.map((item,index) => {
          return (
            <AssignmentCard title={item.title} description={item.description} date={item.date} uniqueCode={item.code}/>
          )
        }) }
      </div>
      </div>
    </div>
  );
};

export default DashboardTab;
