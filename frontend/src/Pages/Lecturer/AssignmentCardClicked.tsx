import { useLocation } from "react-router-dom";
import ActionButton from "../../components/Lecturer/ActionButton";
import BottomContent from "../../components/Lecturer/BottomContent";
import TopContent from "../../components/Lecturer/TopContent";
import Searchbar from "../../components/Lecturer/Searchbar";
import useData from "../../hooks/useAssignmentData";

const AssignmentCardClicked = () => {
    // const keyword = useLocation();
    // const uniqueCode: string = keyword.state.name;
     
    // const dataValue = useData();

    
    // const assignmentData = dataValue.assignments;

    // const output = assignmentData.filter((item) => {
    //     return item.code === uniqueCode
    // });

    const {assignments} = useData();
     const output = assignments.filter((item) => {
        return item.title === 'Javascript'
    });
  return (
       
      <div className="main-content">
        <div className="page-features">
          <Searchbar />
          <div className="header-right">
          <ActionButton class={"action filter"} name={"filter by date"} />
          <ActionButton class={"action assign"} name={"assignment +"} />
          </div>
        </div>
        {/* //// */}
        <div className="clicked-top">
          <h2 className="clicked-header1">Assignment</h2>
          {output.map((item) => {
             return (
                <TopContent title={item.title} uniqueCode={item.code} date={item.date} details={item.fullDetails} />
             )
            })}
        
        </div>
        {output.map((item) => {
             return (
                <BottomContent  invitedStudents={item.numberOfStudents}/>
             )
            })}
      
        {/* //// */}
      </div>
  );
};

export default AssignmentCardClicked;
