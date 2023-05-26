import { configureStore } from '@reduxjs/toolkit';
import LecturerDataSlice from '../store/features/LecturerDataSlice';
import StudentDataSlice from '../store/features/StudentDataSlice';
import AssignmentDataSlice from '../store/features/AssignmentDataSlice';
import SubmissionsDataSlice from '../store/features/SubmissionsDataSlice';
import LecturersStudentDataSlice from '../store/features/LecturersStudentDataSlice';
import StudentsAssignedAssignmentSlice from '../store/features/StudentsAssignedAssignmentSlice';

export const store = configureStore({
  reducer: {
    lecturer: LecturerDataSlice,
    student: StudentDataSlice,
    assignment: AssignmentDataSlice,
    submissions: SubmissionsDataSlice,
    studentAssignedAssignment: StudentsAssignedAssignmentSlice,
    lecturersStudentData: LecturersStudentDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
