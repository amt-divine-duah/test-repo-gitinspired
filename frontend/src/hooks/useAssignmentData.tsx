import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import api from '../ApiClient';
import { AssignmentCardType } from '../components/lecturer_dashboard/LecturerCustomTypes';
import { showErrorMessage } from '../constants/messages';

const useAssignmentData = () => {
  const [assignments, setAssignments] = useState<boolean | undefined | null | AssignmentCardType[]>(
    false,
  );
  const [sortKey, setSortKey] = useState<string | null>(null);
  const auth = useAuthUser();

  useEffect(() => {
    (async () => {
      try {
        const assignments = await api.get(`/api/lecturer/dashboard/${auth()?.loginId}`);
        if (assignments.data?.data.length === 0) {
          setAssignments(null);
          return;
        } else {
          setAssignments(assignments.data?.data);
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage('Something went wrong');
          setAssignments(undefined);
          return;
        } else {
          setAssignments(undefined);
          showErrorMessage('Something went wrong');
          return;
        }
      }
    })();
  }, [auth()?.loginId]);
  const sort = (e: React.MouseEvent<HTMLLIElement>) => {
    const key: string = e.currentTarget.id.toLowerCase();

    setSortKey(key);
  };
  return { sort, sortKey, assignments };
};

export default useAssignmentData;
