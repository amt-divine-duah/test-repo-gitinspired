import api from '../../ApiClient';
import { SubmissionState } from '../../components/lecturer_dashboard/LecturerCustomTypes';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: SubmissionState = {
  submission: null,
  error: null,
  loading: false,
};

export const fetchSubmission = createAsyncThunk('submission/fetch', async (data, thunkAPI) => {
  data;
  try {
    const response = await api.get('/api/admin/assignments');
    const keysToPick = ['staffId', 'firstName', 'lastName', 'email'];
    const submissions = (await _.map(response.data?.data, (obj) =>
      _.pick(obj, keysToPick),
    )) as UserInterface[];
    return submissions;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const SubmissionsDataSlice = createSlice({
  name: 'submissionData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmission.pending, (state, action) => {
        action;
        state.loading = true;
      })
      .addCase(fetchSubmission.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.loading = false;
        state.submission = action.payload;
      })
      .addCase(fetchSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SubmissionsDataSlice.reducer;
