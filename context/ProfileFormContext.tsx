'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ProfileFormValues } from '@/components/forms/profile/schema';
import { defaultValues as profileDefaults } from '@/components/forms/profile/defaults';

export type FormType = 'profile' | 'qualification' | 'employment';

interface FormState {
  profile: Partial<ProfileFormValues>;
  qualification: any; // Replace with proper type when created
  employment: any; // Replace with proper type when created
}

interface FormContextType {
  formData: FormState;
  updateFormData: <T extends FormType>(formType: T, data: Partial<FormState[T]>) => void;
  resetFormData: (formType: FormType) => void;
  resetAllForms: () => void;
}

const initialState: FormState = {
  profile: profileDefaults,
  qualification: {},
  employment: {},
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormState>(initialState);

  const updateFormData = <T extends FormType>(
    formType: T,
    data: Partial<FormState[T]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: {
        ...prev[formType],
        ...data,
      },
    }));
  };

  const resetFormData = (formType: FormType) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: initialState[formType],
    }));
  };

  const resetAllForms = () => {
    setFormData(initialState);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        resetAllForms,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
