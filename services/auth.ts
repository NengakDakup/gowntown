import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  UserCredential,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '@/lib/firebase';

export const signUp = async (email: string, password: string, data: any): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: data.name });

  await setDoc(doc(db, "users", user.uid), {
    name: data.name,
    email: data.email,
    matricNumber: data.matricNumber,
    graduationYear: data.graduationYear,
    institutionType: data.institutionType,
    institutionName: data.institutionName,
  });

  return userCredential;

};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
  return await signOut();
};

export const signOut = async () => {
  return await auth.signOut();
};

export const resetPassword = async (email: string): Promise<void> => {
  return await sendPasswordResetEmail(auth, email);
};
