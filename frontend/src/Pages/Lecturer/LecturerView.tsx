import { Route, Routes } from "react-router-dom";
import SideBar from "../../components/Lecturer/SideBar";
import AssignmentCardClicked from "./AssignmentCardClicked";
import DashboardTab from "./DashboardTab";
import DraftTab from "./DraftTab";
import StudentTab from "./StudentTab";
import SubmissionCardClicked from "./SubmissionCardClicked";
import SubmissionTab from "./SubmissionTab";
import "/src/App.css";

const LecturerView = () => {
  return (
    <div className="lecturer-view">
      <SideBar />
      <Routes>
      <Route path="/" element={<DashboardTab />} />
        <Route path="/dashboard" element={<DashboardTab />} />
        <Route path="/students" element={<StudentTab />} />
        <Route path="/submission" element={<SubmissionTab />} />
        <Route path="/drafts" element={<DraftTab />} />
        <Route path="/assignmentClicked" element={<AssignmentCardClicked />} />
        <Route path="/submissionClicked" element={<SubmissionCardClicked />} />
      </Routes>
      {/* <DashboardTab /> */}
      {/* <StudentTab /> */}
      {/* <SubmissionTab /> */}
      {/* <DraftTab /> */}
      {/* <SubmissionCardClicked /> */}
      {/* <AssignmentCardClicked/> */}
    </div>
  );
};

export default LecturerView;
