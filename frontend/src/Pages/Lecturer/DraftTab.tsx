import DraftCard from "../../components/Lecturer/DraftCard";
import { useState } from "react";


const DraftTab = () => {
    const [draftData, setdraftData] = useState([
        {
          title: "Javascript",
          description:
            "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
          date: "1st May",
          numberOfStudents: 58
        },
        {
          title: "REACT",
          description:
            "Build a web application using React that allows users to browse and search a collection of items.",
          date: "1st May",
          numberOfStudents: 58
        },
        {
          title: "Typescript",
          description:
            "Develop a TypeScript program that reads input data from a JSON file and outputs the data to the console.",
          date: "1st May",
          numberOfStudents: 58
        },
      ]);
  return (
    <div className="draft-dashboard">
      <div className="draft-container">
      { draftData.map((item,index) => {
          return (
            <DraftCard key={index} title={item.title} description={item.description} date={item.date} studentNumber={item.numberOfStudents}/>
          )
        }) }
      </div>
    </div>
  );
};

export default DraftTab;
