'use client';

import MainLayout from '@/components/layouts/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileForm from '@/components/forms/profile/ProfileForm';
import QualificationsForm from '@/components/forms/qualification/QualificationsForm';
import EmploymentForm from '@/components/forms/employment/EmploymentForm';
import { Steps } from '@/components/forms/profile/Steps';
import { useForm, steps } from '@/context/ProfileFormContext';
import ProfilePictureForm from '@/components/forms/ProfilePictureForm';

export default function EditProfile() {
  const { currentStep, nextStep, previousStep } = useForm();

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <ProfileForm onNext={nextStep} />;
      case 2:
        return <QualificationsForm onNext={nextStep} onPrevious={previousStep} />;
      case 3:
        return <EmploymentForm onNext={nextStep} onPrevious={previousStep} />;
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
          <ProfilePictureForm />
          {renderForm()}
        </Card>
      </div>
    </MainLayout>
  );
}
