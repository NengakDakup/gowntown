import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { date } from 'zod';

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

export async function getAllUsers(limit: number = 10) {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Shuffle array and return limited number of users
    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

const jobs = [
  {
    id: 1,
    title: 'Fulltime Senior Product Designer',
    location: 'Remote',
    company: 'Lunar',
    date: '2023-06-01',
    salary: '$500 - $700k',
    level: 'Mid-Senior',
    skills: ['User Interface Design', 'User Experience (UX)', 'Figma'],
    description: `
      <p>
        As a Senior Product Designer at Lunar, you will be responsible for
        designing the user interface and user experience of our products. You will
        work closely with cross-functional teams to identify design solutions
        that meet business goals and user needs.
      </p>
      <p>
        Our ideal candidate has experience with designing complex digital
        products, excellent communication skills, and a passion for creating
        user-centered designs. If you are a motivated and detail-oriented
        designer who is excited about the opportunity to work on a wide range of
        design projects, we would love to hear from you!
      </p>
      <p>
        This is a full-time position that reports directly to the Design Manager
        and is based in our San Francisco office. We also have a remote option
        available for candidates who live outside of the Bay Area.
      </p>
      <ul>
        <li>
          Design user interface and user experience of our products, including
          mobile and web applications
        </li>
        <li>
          Work closely with cross-functional teams to identify design solutions
          that meet business goals and user needs
        </li>
        <li>
          Develop and maintain design standards, guidelines, and best practices
        </li>
        <li>
          Collaborate with product managers to develop product roadmaps and
          design solutions
        </li>
        <li>
          Develop and test prototypes to validate design decisions
        </li>
        <li>
          Communicate design decisions and results to stakeholders
        </li>
        <li>
          Stay up-to-date with industry trends and best practices in user
          experience and user interface design
        </li>
      </ul>
      <p>
        We are an equal opportunities employer and welcome applications from
        all qualified candidates. If you are interested in this position, please
        submit your resume and a cover letter explaining why you are the best fit
        for this role.
      </p>`
  },
  {
    id: 2,
    title: 'Fulltime Frontend Engineer',
    location: 'Remote',
    company: 'Facebook',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKM2JeV2Ni0hFo9LkqV2FdFVuNCQs0duNCg&s',
    date: '2023-06-01',
    salary: '$500 - $700k',
    level: 'Mid-Senior',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    description: `
      <p>
        As a Frontend Engineer at Facebook, you will be responsible for
        building high-quality, user-centered web applications. You will work
        closely with cross-functional teams to identify design solutions that
        meet business goals and user needs.
      </p>
      <p>
        Our ideal candidate has experience with building complex web
        applications, excellent communication skills, and a passion for creating
        user-centered designs. If you are a motivated and detail-oriented
        engineer who is excited about the opportunity to work on a wide range of
        design projects, we would love to hear from you!
      </p>
      <p>
        This is a full-time position that reports directly to the Engineering
        Manager and is based in our Menlo Park office. We also have a remote
        option available for candidates who live outside of the Bay Area.
      </p>
      <ul>
        <li>
          Build high-quality, user-centered web applications using React,
          JavaScript, Tailwind CSS, and other technologies
        </li>
        <li>
          Work closely with cross-functional teams to identify design solutions
          that meet business goals and user needs
        </li>
        <li>
          Develop and maintain design standards, guidelines, and best practices
        </li>
        <li>
          Collaborate with product managers to develop product roadmaps and
          design solutions
        </li>
        <li>
          Develop and test prototypes to validate design decisions
        </li>
        <li>
          Communicate design decisions and results to stakeholders
        </li>
        <li>
          Stay up-to-date with industry trends and best practices in user
          experience and user interface design
        </li>
      </ul>
      <p>
        We are an equal opportunities employer and welcome applications from
        all qualified candidates. If you are interested in this position, please
        submit your resume and a cover letter explaining why you are the best fit
        for this role.
      </p>`
  },
  {
    id: 3,
    title: 'Fulltime Backend Engineer',
    location: 'Remote',
    company: 'Google',
    logo: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
    date: '2023-06-01',
    salary: '$500 - $700k',
    level: 'Mid-Senior',
    skills: ['Node.js', 'JavaScript', 'MongoDB'],
    description: `
      <p>
        As a Backend Engineer at Google, you will be responsible for
        building high-quality, user-centered web applications. You will work
        closely with cross-functional teams to identify design solutions
        that meet business goals and user needs.
      </p>
      <p>
        Our ideal candidate has experience with building complex web
        applications, excellent communication skills, and a passion for creating
        user-centered designs. If you are a motivated and detail-oriented
        engineer who is excited about the opportunity to work on a wide range of
        design projects, we would love to hear from you!
      </p>
      <p>
        This is a full-time position that reports directly to the Engineering
        Manager and is based in our Menlo Park office. We also have a remote
        option available for candidates who live outside of the Bay Area.
      </p>
      <ul>
        <li>
          Build high-quality, user-centered web applications using Node.js,
          JavaScript, MongoDB, and other technologies
        </li>
        <li>
          Work closely with cross-functional teams to identify design solutions
          that meet business goals and user needs
        </li>
        <li>
          Develop and maintain design standards, guidelines, and best practices
        </li>
        <li>
          Collaborate with product managers to develop product roadmaps and
          design solutions
        </li>
        <li>
          Develop and test prototypes to validate design decisions
        </li>
        <li>
          Communicate design decisions and results to stakeholders
        </li>
        <li>
          Stay up-to-date with industry trends and best practices in user
          experience and user interface design
        </li>
      </ul>
      <p>
        We are an equal opportunities employer and welcome applications from
        all qualified candidates. If you are interested in this position, please
        submit your resume and a cover letter explaining why you are the best fit
        for this role.
      </p>`
  }
]

export function getAllJobs() {
  return jobs;
}

export function getJobById(id: number) {
  return jobs.find(job => job.id === id);
}