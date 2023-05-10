import SideBar from "../../components/Lecturer/SideBar";
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
        {/* <DashboardTab /> */}
        {/* <StudentTab /> */}
        {/* <SubmissionTab /> */}
        {/* <DraftTab /> */}
        <SubmissionCardClicked />
    </div>
)
}

export default LecturerView;