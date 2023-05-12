import { useState } from "react";
import ActionButton from "../../components/Lecturer/ActionButton";
import AssignmentCard from "../../components/Lecturer/AssignmentCard";
import Searchbar from "../../components/Lecturer/Searchbar";
import useData from "../../hooks/useAssignmentData";
import { SearchProvider } from "../../components/Lecturer/SearchContext";
import useSearch from "../../hooks/useSearch";

Searchbar;
const DashboardTab = () => {
  const {assignments} = useData();
  const {search, word} =useSearch();
 const output = assignments.filter((item) => {
  return word === ""
    ? item
    : item.title.toLowerCase().includes(word.toLowerCase());
})
  return (
    <>
    <SearchProvider search={search}  word={word}>
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

        { output.map((item,index) => {
       
            return (
              <AssignmentCard title={item.title} description={item.description} date={item.date} uniqueCode={item.code}/>
            )
          
        
        }) }
      </div>
      </div>
    </div>
      </SearchProvider>
      </>
  );
};

export default DashboardTab;
