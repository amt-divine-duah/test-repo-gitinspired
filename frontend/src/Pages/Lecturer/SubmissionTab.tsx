import { useState } from "react";
import SubmissionCard from "../../components/Lecturer/SubmissionCard";

const SubmissionTab = () => {
    const [submissionData, setsubmissionData] = useState([
        {
          title: "Javascript",
          number: 222,
        },
        {
          title: "REACT",
          number: 200,
        },
        {
          title: "Typescript",
          number: 10,
        },
      ]);
  return (
    <div className="submission-dashboard">
      <div className="submission-container">
      { submissionData.map((item,index) => {
          return (
            <SubmissionCard width={349} height={165} title={item.title} numberOfSubmissions={item.number}/>
          )
        }) }
 
      </div>
    </div>
  );
};

export default SubmissionTab;
