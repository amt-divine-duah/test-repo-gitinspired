import { useEffect, useState } from 'react';
import { showErrorMessage } from '../constants/messages';
import axios from 'axios';
import api from '../ApiClient';
import {
  FullAssignmentData,
  StudentsListData,
} from '../components/lecturer_dashboard/LecturerCustomTypes';

const useAssignmentCardClicked = (number: number) => {
  const [studentsdata, setStudentsData] = useState<StudentsListData[] | null | undefined>([]);

  const [assignmentsdata, setAssignmentData] = useState<FullAssignmentData | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const students = await api.get(`/api/lecturer/edit-assignment/${number}/`);
        if (students.data?.data.length === 0) {
          setStudentsData(null);
          return;
        } else {
          setAssignmentData(students.data?.data.assignment);
          setStudentsData(students.data?.data.students);
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage('Something went wrong');
          setStudentsData(undefined);
          return;
        } else {
          setStudentsData(undefined);
          showErrorMessage('Something went wrong');
          return;
        }
      }
    })();
  }, [number]);

  return { studentsdata, assignmentsdata };
};

export default useAssignmentCardClicked;
