import React from 'react';
import { formSubmitType } from './CustomTypes';

export const FormContext = React.createContext<formSubmitType>({} as formSubmitType);

interface Child extends formSubmitType {
  children: React.ReactNode;
}

export const FormProvider = ({
  children,
  firstInput,
  secondInput,
  collectConfirmPassword,
  collectNewPassword,
  collectEmail,
  collectPassword,
}: Child) => {
  return (
    <FormContext.Provider
      value={{
        firstInput,
        secondInput,
        collectConfirmPassword,
        collectEmail,
        collectNewPassword,
        collectPassword,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
