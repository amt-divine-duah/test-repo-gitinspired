import api from '../../ApiClient';
import {
  StudentAssignment,
  StudentAssignmentState,
} from '../../components/lecturer_dashboard/LecturerCustomTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: StudentAssignmentState = {
  assignment: null,
  error: null,
  loading: false,
};

export const fetchStudentAssignedAssignment = createAsyncThunk(
  'student/fetch',
  async (data, thunkAPI) => {
    data;
    try {
      const response = await api.get('/api/student/dashboard');
      const keysToPick = ['title', 'description', 'deadline', 'uniqueCode'];
      const students = _.map(response.data?.data, (obj) =>
        _.pick(obj, keysToPick),
      ) as StudentAssignment[];
      return students;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const StudentsAssignedAssignmentsSlice = createSlice({
  name: 'studentAssignedAssignment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentAssignedAssignment.pending, (state, action) => {
        action;
        state.loading = true;
      })
      .addCase(
        fetchStudentAssignedAssignment.fulfilled,
        (state, action: PayloadAction<StudentAssignment[]>) => {
          state.loading = false;
          state.assignment = action.payload;
        },
      )
      .addCase(fetchStudentAssignedAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default StudentsAssignedAssignmentsSlice.reducer;
