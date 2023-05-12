import { useState, useEffect } from "react";
import { UserInterface } from "../interfaces/UserInterface";

const useStudents = () => {
  const [students, setStudents] = useState<UserInterface[]>([
    {
      id: "1234",
      firstName: "Benstrong",
      lastName: "Benstrong",
      email: "benstrong@gamil.com",
    },
    {
      id: "1234",
      firstName: "Benstrong",
      lastName: "Benstrong",
      email: "benstrong@gamil.com",
    },
  ]);

  return { students };
};

export default useStudents;
