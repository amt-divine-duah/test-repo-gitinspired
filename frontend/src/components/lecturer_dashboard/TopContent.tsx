import { useRef } from "react";
import { FullAssignmentData } from "./LecturerCustomTypes";

const TopContent = (prop: FullAssignmentData) => {
  const copyRef = useRef<HTMLInputElement>(null);

  const copyCode = () => {
    const code = copyRef.current?.innerHTML as string;
    navigator.clipboard.writeText(code);

  }
  return (
    <div className='clicked-card'>
      <div className='assignment-description-bar'>
        <div className='assignment-name'>
          <p>{prop.title}</p>
        </div>
        <div className='assignment-code'>
          <p className='code-label'>Unique Code</p>
          <p className='code' ref={copyRef}>{prop.uniqueCode}</p>
          <img src='/copy.png' alt='copy' className='copy' onClick={copyCode}/>
        </div>
      </div>
      <div className='assignment-information'>
        <div className='assignment-signals'>
          <p>Description</p>
          <p>{prop.deadline && new Date(prop.deadline).toDateString().slice(3)}</p>
        </div>
        <p className="assignment-full-details">{prop.description} </p>
      </div>
    </div>
  );
};

export default TopContent;
