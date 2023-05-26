import { LoginSubmitButtonType } from './CustomTypes';
const LoginSubmitButton = (prop: { data: LoginSubmitButtonType }) => {
  return (
    <button type='submit' id={prop.data.id}>
      <p> {prop.data.buttonName} </p>
    </button>
  );
};

export default LoginSubmitButton;
