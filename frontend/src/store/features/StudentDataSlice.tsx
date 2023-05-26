import api from '../../ApiClient';
import { StudentState } from '../../components/lecturer_dashboard/LecturerCustomTypes';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: StudentState = {
  student: null,
  error: null,
  loading: false,
};

export const fetchStudent = createAsyncThunk('student/fetch', async (data, thunkAPI) => {
  data;
  try {
    const response = await api.get('/api/admin/students');
    const keysToPick = ['studentId', 'firstName', 'lastName', 'email'];
    const students = _.map(response.data?.data, (obj) =>
      _.pick(obj, keysToPick),
    ) as UserInterface[];
    return students;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const StudentDataSlice = createSlice({
  name: 'studentData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudent.pending, (state, action) => {
        action;
        state.loading = true;
      })
      .addCase(fetchStudent.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default StudentDataSlice.reducer;
