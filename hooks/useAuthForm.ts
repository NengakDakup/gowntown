'use client';

import { useState } from 'react';
import { signIn, signUp, resetPassword } from '@/services/auth';
import { useRouter } from 'next/navigation';

export const useAuthForm = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (email: string, password: string) => {
    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setError('Password reset email sent!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleSignUp,
    handleSignIn,
    handleResetPassword,
  };
};
