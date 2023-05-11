import { useState } from "react";
import SubmissionCard from "../../components/Lecturer/SubmissionCard";
import useData from "../../hooks/useAssignmentData";

const SubmissionTab = () => {
    const{ assignments }= useData();
  return (
    <div className="submission-dashboard">
      <div className="submission-container">
      { assignments.map((item,index) => {
          return (
            <SubmissionCard width={349} height={165} title={item.title} numberOfSubmissions={item.numberOfStudents}/>
          )
        }) }
 
      </div>
    </div>
  );
};

export default SubmissionTab;
