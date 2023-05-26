import { useEffect, useState } from 'react';
import { showErrorMessage } from '../constants/messages';
import axios from 'axios';
import api from '../ApiClient';
import { useAuthUser } from 'react-auth-kit';
import { SubmissionData } from '../components/lecturer_dashboard/LecturerCustomTypes';

const useSubmissions = () => {
  const [submissions, setSubmission] = useState<SubmissionData[] | null | undefined | boolean>(
    false,
  );

  const auth = useAuthUser();
  useEffect(() => {
    (async () => {
      try {
        const submissions = await api.get(`/api/lecturer/submissions/${auth()?.loginId}`);
        if (submissions.data?.data.length === 0) {
          setSubmission(null);
          return;
        } else {
          setSubmission(submissions.data?.data);
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage('Something went wrong');
          setSubmission(undefined);
          return;
        } else {
          setSubmission(undefined);
          showErrorMessage('Something went wrong');
          return;
        }
      }
    })();
  }, []);

  return { submissions };
};

export default useSubmissions;
