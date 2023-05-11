import { useState, useEffect } from "react";

const useDraft = () => {
  const [drafts, setDraft] = useState([
    {
        title: "Javascript",
        description:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
        date: "1st May",
        numberOfStudents: 58
      },  {
        title: "Javascript",
        description:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
        date: "1st May",
        numberOfStudents: 58
      }
  ]);

  return { drafts };
};

export default useDraft;
