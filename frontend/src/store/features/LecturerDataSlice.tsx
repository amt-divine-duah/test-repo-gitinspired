import api from '../../ApiClient';
import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { LecturerState } from '../../components/lecturer_dashboard/LecturerCustomTypes';

const initialState: LecturerState = {
  lecturer: null,
  error: null,
  loading: false,
};

export const fetchLecturer = createAsyncThunk('lecturer/fetch', async (data, thunkAPI) => {
  try {
    data;
    const response = await api.get('/api/admin/lecturers');
    const keysToPick = ['staffId', 'firstName', 'lastName', 'email'];
    const lecturers = (await _.map(response.data?.data, (obj) =>
      _.pick(obj, keysToPick),
    )) as UserInterface[];
    return lecturers;
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
      .addCase(fetchLecturer.pending, (state, action) => {
        action;
        state.loading = true;
      })
      .addCase(fetchLecturer.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
        state.loading = false;
        state.lecturer = action.payload;
      })
      .addCase(fetchLecturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default LecturerDataSlice.reducer;
