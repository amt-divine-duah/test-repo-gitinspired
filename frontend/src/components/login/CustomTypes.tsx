export interface InputAcceptType {
  labelName: string;
  type: string;
  placeholder: string;
  name: string;
  id: string;
}

export interface LoginSubmitButtonType {
  id: string;
  buttonName: string;
}
export interface formType {
  title: string;
  input1: JSX.Element;
  input2: JSX.Element;
  button: LoginSubmitButtonType;
}
export interface formSubmitType {
  firstInput: string;
  secondInput: string;
  collectEmail: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  collectPassword: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  collectNewPassword: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  collectConfirmPassword: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}

export interface FormErrors {
  emailOrId?: string[];
  password?: string[];
  confirmPassword?: string[];
}
