import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import api from '../ApiClient';
import { DraftDataType } from '../components/lecturer_dashboard/LecturerCustomTypes';
import { showErrorMessage } from '../constants/messages';

const useDraftData = () => {
  const [drafts, setDraft] = useState<DraftDataType[] | null | undefined | boolean>([]);
  const auth = useAuthUser();
  useEffect(() => {
    (async () => {
      try {
        const assignments = await api.get(`/api/lecturer/drafts/${auth()?.loginId}`);

        if (assignments.data?.data.length === 0) {
          setDraft(null);
          return;
        } else {
          setDraft(assignments.data?.data);
          return;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showErrorMessage('Something went wrong');
          setDraft(undefined);
          return;
        } else {
          setDraft(undefined);
          showErrorMessage('Something went wrong');
          return;
        }
      }
    })();
  }, []);
  return { drafts };
};

export default useDraftData;
