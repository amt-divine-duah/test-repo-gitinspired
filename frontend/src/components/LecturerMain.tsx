import React from "react";
import SideBar from "./Lecturer/SideBar";

interface MainProps {
  sidebar?: boolean;
  children: React.ReactNode;
}

const LecturerMain = (props: MainProps) => {
  return (
    <div className="lecturer-view">
    {props.sidebar && <SideBar />}
    {props.children}
    </div>
  );
};

export default LecturerMain;
