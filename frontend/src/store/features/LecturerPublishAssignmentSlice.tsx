import api from '../../ApiClient';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showErrorMessage, showSuccessMessage } from '../../constants/messages';
import { StatusCodes } from 'http-status-codes';
import {
  PublishAssignmentData,
  PublishState,
} from '../../components/lecturer_dashboard/LecturerCustomTypes';

const initialState: PublishState = {
  data: null,
  error: null,
  loading: false,
};

export const publishAssignment = createAsyncThunk(
  'assignment/publish',
  async (data: PublishAssignmentData, thunkAPI) => {
    try {
      const response = await api.post('/api/lecturer/create-assignment', data);
      if (response.status === StatusCodes.OK && data.publish === false) {
        showSuccessMessage('Draft assigment created');
      }
      if (response.status === StatusCodes.OK && data.publish === true) {
        showSuccessMessage(response.data?.message);
      }
      return response.data;
    } catch (error) {
      showErrorMessage('Something went wrong');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const lecturerPublishAssignmentSlice = createSlice({
  name: 'lecturer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        publishAssignment.fulfilled,
        (state, action: PayloadAction<PublishAssignmentData[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(publishAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default lecturerPublishAssignmentSlice.reducer;
