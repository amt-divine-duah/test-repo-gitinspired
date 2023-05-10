import SideBar from "../../components/Lecturer/SideBar";
import DashboardTab from "./DashboardTab";
import StudentTab from "./StudentTab";
import SubmissionTab from "./SubmissionTab";
import "/src/App.css";

const LecturerView = () => {
return (
    <div className="lecturer-view">
        <SideBar />
        {/* <DashboardTab /> */}
        {/* <StudentTab /> */}
        <SubmissionTab />
    </div>
)
}

export default LecturerView;