import { Dispatch, SetStateAction } from 'react';
import { ROLE } from '../constants/roles';

export type Data = {
  id: string;
  name: string;
  email: string;
};

export type UploadFileType = {
  showUploadModal: React.MouseEventHandler;
  user: string;
  onBulkUpload: (newUsers: UserInterface[]) => void;
  hideModal: () => void;
};

export interface UserInterface {
  studentId?: string;
  staffId?: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface StudentData {
  studentData: UserInterface[] | null | undefined;
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
  selectedUsers: string[];
}

export interface FormErrors {
  email?: string[];
  firstname?: string[];
  lastname?: string[];
}

export type LogoutPropType = {
  handleLogout: React.MouseEventHandler;
};

export interface BoardPropType {
  users: string;
  buttonInfo: string;
  message: string;
  showAddUserModal: React.MouseEventHandler;
  data?: UserInterface[] | null;
  userTableName: string;
  showUploadModal: React.MouseEventHandler;
}

export type CreateUserPropType = {
  user: string;
  showModal: React.MouseEventHandler;
  onCreateUser: (newUser: UserInterface) => void;
};

export interface TableDataType {
  userTableName: string;
  data: UserInterface[] | null | undefined;
}

export interface ProtectedType {
  roles: ROLE[];
  children: JSX.Element;
}

export interface MainProps {
  header?: boolean;
  studentHeader?: boolean;
  children: React.ReactNode;
}
