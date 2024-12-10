'use client';

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getAllUsers } from '@/lib/firebase-utils';
import { ProfileFormValues } from './forms/profile/schema';
import { EmploymentFormValues } from './forms/employment/schema';
import { QualificationFormValues } from './forms/qualification/schema';
import { useAuth } from '@/context/AuthContext';

interface UserData {
  id: string;
  email: string;
  institutionName: string;
  profile: ProfileFormValues;
  employment: EmploymentFormValues;
  qualification: QualificationFormValues;
}

const UserSuggestions = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    async function fetchRandomUsers() {
      try {
        const fetchedUsers = await getAllUsers(3);
        // Filter out the current user from suggestions
        const filteredUsers = currentUser 
          ? fetchedUsers.filter(user => user.id !== currentUser.uid)
          : fetchedUsers;
        setUsers(filteredUsers as UserData[]);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRandomUsers();
  }, [currentUser]);

  if (loading) {
    return <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">Loading...</div>;
  }

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <h3 className="font-semibold mb-4 px-4 pt-4">People You May Know</h3>
      <div className="space-y-4 px-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2 pb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/assets/images/user.png"
                alt={`${user.profile.firstName} ${user.profile.lastName}`}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <Link href={`/user/${user.id}`} className="font-medium hover:underline">
                {user.profile.firstName} {user.profile.lastName}
              </Link>
              <p className="text-sm text-muted-foreground">
                {user.institutionName}
              </p>
            </div>
            <Link href={`/user/${user.id}`}>
              <Button size="sm" variant="ghost">
                View <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSuggestions