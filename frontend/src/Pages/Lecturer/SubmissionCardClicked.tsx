import { useState } from "react";
import SubmissionCard from "../../components/Lecturer/SubmissionCard";
import Document from "../../components/Lecturer/Document";
import LecturerMain from "../../components/LecturerMain";

const SubmissionCardClicked = () => {
    const[studentList, getStudentList] = useState([{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
        name: 'Paul'
    },{
      name: 'Paul'
  },{
      name: 'Paul'
  },{
      name: 'Paul'
  },{
      name: 'Paul'
  },{
      name: 'Paul'
  },{
      name: 'Paul'
  },{
      name: 'Paul'
  }])
    const[fileList, getFileList] = useState([{
        file: 'Public'
    },{
        file: 'JS'
    },{
        file: 'src'
    },{
        file: 'README.md'
    },{
        file: 'index.css'
    },{
        file: 'index.html'
    }])
  return (
    <LecturerMain sidebar>
      <div className="submission-dashboard">
        <div className="submissionClicked-container">
          <SubmissionCard
            width={607}
            height={159}
            title="Javascript"
            numberOfSubmissions={3}
          />
          <div className="submission-details-container">
            <div className="name-list">
              {studentList.map((item, index) => {
                return <p key={index}>{item.name}</p>;
              })}
            </div>
            <div className="submission-documents">
              <div className="document-features">
                <div className="snapshot">
                  <div
                    className="snapshot-button"
                    onClick={() => {
                      const dropdown = document.getElementById("dropdown");
                      dropdown?.classList.contains("dropdown-visible")
                        ? dropdown.classList.remove("dropdown-visible")
                        : dropdown?.classList.add("dropdown-visible");
                    }}
                  >
                    <p>Snapshot 2</p>
                    <div className="button-image">
                      <img src="/downarrow.png" alt="down-arrow" />
                    </div>
                  </div>
                  <div className="dropdown" id="dropdown">
                    <ul>
                      <li>Snapshot 2</li>
                      <li>Snapshot 3</li>
                      <li>Snapshot 4</li>
                    </ul>
                  </div>
                </div>
                <div className="download-button">
                  <p>Download Zip</p>
                  <div className="button-image">
                    <img src="/download.png" alt="download-icon" />
                  </div>
                </div>
              </div>
              <div className="document-list">
                <table>
                  {fileList.map((item, index) => {
                    return <Document key={index} file={item.file} />;
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LecturerMain>
  );
};

export default SubmissionCardClicked;
