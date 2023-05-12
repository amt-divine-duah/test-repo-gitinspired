import { useLocation } from "react-router-dom";
import ActionButton from "../../components/Lecturer/ActionButton";
import TopContent from "../../components/Lecturer/TopContent";
import BottomContent from "../../components/Lecturer/BottomContent";
import Searchbar from "../../components/Lecturer/Searchbar";
import useData from "../../hooks/useAssignmentData";
import LecturerMain from "../../components/LecturerMain";

const AssignmentCardClicked = () => {
    const keyword = useLocation();
    const uniqueCode: string = keyword.state.name;
     
    const dataValue = useData();

    
    const assignmentData = dataValue.assignments;

    const output = assignmentData.filter((item) => {
        return item.code === uniqueCode;
    });

    // const {assignments} = useData();
    //  const output = assignments.filter((item) => {
    //     return item.title === 'Javascript'
    // });

    
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
              handleClick={handleClick}
            />
          </div>
        </div>
        {/* //// */}
        <div className="clicked-top">
          <h2 className="clicked-header1">Assignment</h2>
          {output.map((item) => {
            return (
              <TopContent
                title={item.title}
                uniqueCode={item.code}
                date={item.date}
                details={item.fullDetails}
              />
            );
          })}
        </div>
        {output.map((item) => {
          return <BottomContent invitedStudents={item.numberOfStudents} />;
        })}

        {/* //// */}
      </div>
    </LecturerMain>
  );
};

export default AssignmentCardClicked;
