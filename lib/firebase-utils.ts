import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function syncToFirebase<T extends object>(formType: string, data: T) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    console.log(`Syncing ${formType} data:`, cleanedData);
    
    await setDoc(doc(db, 'users', user.uid), {
      [formType]: cleanedData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error(`Error syncing ${formType} data to Firebase:`, error);
  }
}
