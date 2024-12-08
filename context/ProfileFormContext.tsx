'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProfileFormValues } from '@/components/forms/profile/schema';
import { QualificationFormValues } from '@/components/forms/qualification/schema';
import { EmploymentFormValues } from '@/components/forms/employment/schema';

import { defaultValues as profileDefaults } from '@/components/forms/profile/defaults';
import { defaultValues as qualificationDefaults } from '@/components/forms/qualification/defaults';
import { defaultValues as employmentDefaults } from '@/components/forms/employment/defaults';

import { fetchUserData } from '@/lib/firebase-utils';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export type FormType = 'profile' | 'qualification' | 'employment';

export const steps = [
  { title: 'Personal Information', type: 'profile' },
  { title: 'Qualifications', type: 'qualification' },
  { title: 'Employment History', type: 'employment' },
] as const;

interface FormState {
    [key: string]: Partial<ProfileFormValues> | Partial<QualificationFormValues> | Partial<EmploymentFormValues>;
}

interface FormContextType {
  formData: FormState;
  currentStep: number;
  updateFormData: <T extends FormType>(formType: T, data: Partial<FormState[T]>) => void;
  resetFormData: (formType: FormType) => void;
  resetAllForms: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setStep: (step: number) => void;
  isLoading: boolean;
}

const initialState: FormState = {
  profile: profileDefaults,
  qualification: qualificationDefaults,
  employment: employmentDefaults,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        try {
          const userData = await fetchUserData();
          if (userData) {
            setFormData(prev => ({
              ...prev,
              profile: userData.profile || profileDefaults,
              qualification: userData.qualification || qualificationDefaults,
              employment: userData.employment || employmentDefaults,
            }));
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateFormData = <T extends FormType>(
    formType: T,
    data: Partial<FormState[T]>
  ) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [formType]: {
          ...prev[formType],
          ...data,
        },
      };
      return newData;
    });
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

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const setStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        currentStep,
        updateFormData,
        resetFormData,
        resetAllForms,
        nextStep,
        previousStep,
        setStep,
        isLoading,
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
