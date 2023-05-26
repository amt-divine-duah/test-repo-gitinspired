import api from '../../ApiClient';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  Assignment,
  AssignmentState,
} from '../../components/lecturer_dashboard/LecturerCustomTypes';

const initialState: AssignmentState = {
  assignment: null,
  error: null,
  loading: false,
};

export const fetchAssignment = createAsyncThunk('assignment/fetch', async (data, thunkAPI) => {
  try {
    data;
    const response = await api.get('/api/admin/assignments');
    const keysToPick = ['staffId', 'firstName', 'lastName', 'email'];
    const assignment = (await _.map(response.data?.data, (obj) =>
      _.pick(obj, keysToPick),
    )) as Assignment[];
    return assignment;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const LecturerDataSlice = createSlice({
  name: 'lecturerData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignment.pending, (state, action) => {
        action;
        state.loading = true;
      })
      .addCase(fetchAssignment.fulfilled, (state, action: PayloadAction<Assignment[]>) => {
        state.loading = false;
        state.assignment = action.payload;
      })
      .addCase(fetchAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default LecturerDataSlice.reducer;
