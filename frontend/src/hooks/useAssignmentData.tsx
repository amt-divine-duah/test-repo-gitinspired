import { useState, useEffect } from "react";

const useData = () => {
  const [assignments, setAssignments] = useState([
    {
      title: "Javascript",
      description:
        "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
      date: "1st May",
      numberOfStudents: 7,
      code: '51143',
      fullDetails:
        "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks.Build a web application using React that allows users to browse and search a collection of items.Develop a TypeScript program that reads input data from a JSON file and outputs the data to the console.",
      students: [
        {
          name: "John",
          status: "invited",
        },
        {
          name: "Richard",
          status: "invited",
        },
        {
          name: "Emily",
          status: "",
        },
        {
          name: "Justin",
          status: "invited",
        },
        {
          name: "Lucas",
          status: "invited",
        },
        {
          name: "Paul",
          status: "invited",
        },
        {
          name: "Annita",
          status: "invited",
        },
      ],
    },{
        title: "React",
        description:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
        date: "1st May",
        numberOfStudents: 3,
        code: '51153',
        fullDetails:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks.Build a web application using React that allows users to browse and search a collection of items.Develop a TypeScript program that reads input data from a JSON file and outputs the data to the console.",
        students: [
          {
            name: "John",
            status: "invited",
          },
          {
            name: "Richard",
            status: "invited",
          },
          {
            name: "Emily",
            status: "",
          }
        ]
      },{
        title: "Typescript",
        description:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks. ",
        date: "1st May",
        numberOfStudents: 1,
        code: '51163',
        fullDetails:
          "Your task is to develop a web application using JavaScript that provides a user-friendly interface for tracking and managing tasks.Build a web application using React that allows users to browse and search a collection of items.Develop a TypeScript program that reads input data from a JSON file and outputs the data to the console.",
        students: [
          {
            name: "John",
            status: "invited",
          }
          
        ]
      }
    
  ]);

  return { assignments };
};

export default useData;
