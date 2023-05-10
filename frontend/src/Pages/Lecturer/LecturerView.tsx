import SideBar from "../../components/Lecturer/SideBar";
import DashboardTab from "./DashboardTab";
import "/src/App.css";

const LecturerView = () => {
return (
    <div className="lecturer-view">
        <SideBar />
        <DashboardTab />
    </div>
)
}

export default LecturerView;