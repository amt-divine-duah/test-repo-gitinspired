import { useEffect, useState } from "react";
import ActionButton from "../../components/Lecturer/ActionButton";
import AssignmentCard from "../../components/Lecturer/AssignmentCard";
import { convert } from "html-to-text"
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import Searchbar from "../../components/Lecturer/Searchbar";
import LecturerCreateNewAssignmentModal from "../../LecturerDashBoardComponents/LecturerCreateNewAssignmentModal";
import api from "../../ApiClient";
import { useAuthUser } from "react-auth-kit";
import { showErrorMessage } from "../../constants/messages";
import axios from "axios";
import { CircularProgress } from "@mui/joy";
import { AssignmentInterface } from "../../interfaces/AssigmentInterface";

Searchbar;
const DashboardTab = () => {
  const [assignments, setAssignments] = useState<boolean | undefined | AssignmentInterface[]>(false)
  const [draftAssignments, setDraftAssignments] = useState<boolean | undefined | AssignmentInterface[]>(false)
  const auth = useAuthUser();
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);

  function handleClick() {
    console.log("Hey");
  }

  function handleAssignment() {
    setShowCreateAssignment((prev) => !prev);
  }

  function onCreateAssignment(assignment: AssignmentInterface) {

    console.log("assignment done");
    console.log("I was able to get the assignment", assignment)
    setAssignments((prevData) => {
      if (
        prevData === null ||
        prevData === undefined ||
        typeof prevData === "boolean"
      ) {
        return [assignment];
      } else {
        return [...prevData, assignment];
      }
    })
    setShowCreateAssignment((prev) => !prev);
  }

  function onDraftAssignment(assignment: AssignmentInterface) {
    console.log("This is for drafted assignmnets");
    setDraftAssignments((prevData) => {
      if (
        prevData === null ||
        prevData === undefined ||
        typeof prevData === "boolean"
      ) {
        return [assignment];
      } else {
        return [...prevData, assignment];
      }
    });
    setShowCreateAssignment((prev) => !prev);
  }

  useEffect(() => {
    (async () => {
      try {
        // const lecturer = await api.get("/api/admin/lecturers");
        console.log(auth()?.loginId, "Hosd");
        const assignments = await api.get(
          `/api/lecturer/dashboard/${auth()?.loginId}`
        );
        console.log("Het", assignments.data?.data);
        if (assignments.data?.data.length === 0) {
          setAssignments(null);
          return
        }
        else {
          setAssignments(assignments.data?.data);
          return
        }
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage("Something went wrong");
          setAssignments(undefined);
          return
        }
        else {
          setAssignments(undefined)
          showErrorMessage("Something went wrong");
          return
        }
      }
      
    })();
  }, []);

  let contents;
  if (assignments === false) {
    contents = (
      <div className="landingPage">
        <CircularProgress size="md" />
      </div>
    );
  }
  else if (assignments === undefined) {
    contents = <p>Could not load data</p>
  }
  else if (assignments === null) {
    contents = <h2 className="page-header">No Assignments</h2>;
  }
  else {
    contents = (
      <>
        <h2 className="page-header">Assignment</h2>
        <div className="assignment-container">
          {Array.isArray(assignments) && assignments.map((item, index) => {
            return (
              <AssignmentCard
                key={item.uniqueCode}
                title={item.title}
                description={convert(item.description)}
                deadline={format(new Date(`${item.deadline}`), "do MMM", {
                  locale: enGB,
                })}
                uniqueCode={item.uniqueCode}
              />
            );
          })}
        </div>
      </>
    );
  }
  return (
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
            handleClick={handleAssignment}
          />
        </div>
      </div>
      <div>
        {contents}
      </div>
      {showCreateAssignment === true && (
        <LecturerCreateNewAssignmentModal
          handleShowAssignmentModal={handleAssignment}
          onCreateAssignment={onCreateAssignment}
          onDraftAssignment={onDraftAssignment}
        />
      )}
    </div>
  );
};

export default DashboardTab;
