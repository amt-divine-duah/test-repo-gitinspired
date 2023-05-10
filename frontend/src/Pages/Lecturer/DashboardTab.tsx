import { useState } from "react";
import ActionButton from "../../components/Lecturer/ActionButton";
import AssignmentCard from "../../components/Lecturer/AssignmentCard";
import Searchbar from "../../components/Lecturer/Searchbar";

Searchbar;
const DashboardTab = () => {
  const [cardData, setCardData] = useState([
    {
      title: "Javascript",
      description:
        "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
      date: "1st May, 2023",
      uniqueCode: "5867947",
    },
    {
      title: "REACT",
      description:
        "Build a web application using React that allows users to browse and search a collection of items.",
      date: "1st May, 2023",
      uniqueCode: "5867947",
    },
    {
      title: "Typescript",
      description:
        "Develop a TypeScript program that reads input data from a JSON file and outputs the data to the console. The program should demonstrate an understanding of TypeScript syntax and data types, i",
      date: "1st May, 2023",
      uniqueCode: "5867947",
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
      <div>
        <h2 className="page-header">Assignment</h2>
        <div className="assignment-container">

        { cardData.map((item,index) => {
          return (
            <AssignmentCard title={item.title} description={item.description} date={item.date} uniqueCode={item.uniqueCode}/>
          )
        }) }
      </div>
      </div>
    </div>
  );
};

export default DashboardTab;
