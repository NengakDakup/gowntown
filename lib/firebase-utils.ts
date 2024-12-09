import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

export async function syncToFirebase<T extends object>(formType: string, data: T) {
  try {
    const user = auth.currentUser;
    if (!user) return;

    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );
    
    await setDoc(doc(db, 'users', user.uid), {
      [formType]: cleanedData,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    console.error(`Error syncing ${formType} data to Firebase:`, error);
  }
}

export async function fetchUserData() {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) return null;

    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const profileRef = doc(db, `users/${userId}/profile`);
    const employmentRef = doc(db, `users/${userId}/employment`);
    const qualificationRef = doc(db, `users/${userId}/qualification`);

    const [profileSnapshot, employmentSnapshot, qualificationSnapshot] = await Promise.all([
      getDoc(profileRef),
      getDoc(employmentRef),
      getDoc(qualificationRef),
    ]);

    return {
      profile: profileSnapshot.data(),
      employment: employmentSnapshot.data(),
      qualification: qualificationSnapshot.data(),
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function getUserData(userId: string) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
