import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
export type ShowMoadalType = {
  handleShowAssignmentModal: React.MouseEventHandler;
};
export interface ActionButtonType {
  class: string;
  name: string;
  click: React.MouseEventHandler<HTMLButtonElement> | undefined;
  reference: React.LegacyRef<HTMLButtonElement> | undefined;
}

export interface AssignmentCardType {
  title: string;
  description: string;
  deadline: string;
  uniqueCode: string;
  course?: string;
}

export interface MainProps {
  sidebar?: boolean;
  children: React.ReactNode;
}
export interface Assignment {
  title: string;
  description: string;
  deadline: string;
}

export interface AssignmentState {
  assignment: Assignment[] | null | undefined;
  error: null | string;
  loading: boolean;
}

export interface LecturerState {
  lecturer: UserInterface[] | null | undefined;
  error: null | string;
  loading: boolean;
}

export interface PublishAssignmentData {
  title?: string;
  description?: string;
  deadline?: string;
  createdBy?: string;
  publish?: boolean;
  students?: string[];
  course?: string;
}

export interface StudentAssignment {
  title: string;
  description: string;
  deadline: string;
  uniqueCode: string;
}

export interface Assignment {
  assignment: StudentAssignment[];
}

export interface StudentState {
  student: UserInterface[] | null | undefined;
  error: null | string;
  loading: boolean;
}

export interface StudentAssignmentState {
  assignment: StudentAssignment[] | null | undefined;
  error: null | string;
  loading: boolean;
}

export interface PublishState {
  data: PublishAssignmentData[] | null;
  error: string | null;
  loading: boolean;
}

export interface SubmissionState {
  submission: UserInterface[] | null | undefined;
  error: null | string;
  loading: boolean;
}

export interface DraftCardType {
  title: string;
  description: string;
  date: string;
  studentNumber: number;
}

export interface DraftDataType {
  title: string;
  description: string;
  updatedAt: string;
  _count: {
    students: number;
  };
}

export interface SubmissionData {
  title: string;
  id: number;
  course: string;
  submissions: number;
}
export interface searchType {
  search: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  word: string;
}
