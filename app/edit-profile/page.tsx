'use client';

import { useState } from 'react';
import MainLayout from "@/components/layouts/MainLayout"
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/forms/profile/ProfileForm';
import QualificationsForm from '@/components/forms/qualification/QualificationsForm';
import EmploymentForm from '@/components/forms/profile/EmploymentForm';
import { Steps } from '@/components/forms/profile/Steps';

const steps = [
  { id: 1, name: 'Profile Information' },
  { id: 2, name: 'Qualifications & Skills' },
  { id: 3, name: 'Employment History' },
];

export default function EditProfile() {
  const [currentStep, setCurrentStep] = useState(2);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <ProfileForm onNext={nextStep} />;
      case 2:
        return <QualificationsForm onNext={nextStep} onPrevious={previousStep} />;
      case 3:
        return <EmploymentForm onPrevious={previousStep} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout showRightContent={false}>
    <div className="w-full px-3 md:px-10 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <Steps steps={steps} currentStep={currentStep} />
      <Card className="mt-8 p-3">
        {renderForm()}
      </Card>
    </div>
    </MainLayout>
  );
}
