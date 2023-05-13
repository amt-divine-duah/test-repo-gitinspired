import { useState, useEffect } from "react";

const useStudents = () => {
  const [students, setStudents] = useState([
    {
        id: "1234",
        name: "Benstrong",
        email: "benstrong@gamil.com",
      },
      {
        id: "1234",
        name: "Benstrong",
        email: "benstrong@gamil.com",
      } 
  ]);

  return { students };
};

export default useStudents;
