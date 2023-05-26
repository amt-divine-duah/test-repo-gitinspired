import { UserInterface } from '../../customTypesAndInterface/AdminCustomTypes';
export type ShowMoadalType = {
  handleShowAssignmentModal: React.MouseEventHandler;
  Title?:string;
  id: number;
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
  deadline: Date;
  uniqueCode: string;
  id: number;
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
  id: number;
  title: string;
  description: string;
  date: string;
  studentNumber: number;
}

export interface DraftDataType {
  id: number;
  title: string;
  description: string;
  updatedAt: string;
  _count: {
    students: number;
  }
}

export interface SubmissionData {
  title: string;
      id: number;
      course: string;
      submissions: number;
}
export interface SearchType {
  search: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  word: string;
}

export interface FullAssignmentData {
  course?: string;
  deadline?: Date;
  description?: string;
  title?: string;
  uniqueCode?: string;
  updatedAt?: Date;
}

export interface StudentsListData {
  assignmentId?: number;
  id: number;
  students : {
    firstName: string;
    lastName: string;
    email: string;
    studentId: string;
  }

}