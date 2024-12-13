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
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UserListSkeletonLoader from './skeletons/UserListSkeletonLoader';

interface UserData {
  id: string;
  email: string;
  name: string;
  institutionName: string;
  photoURL?: string;
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
    return <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <UserListSkeletonLoader />
      <UserListSkeletonLoader />
    </div>;
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
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.photoURL} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Link href={`/user/${user.id}`} className="text-sm font-medium hover:underline">
                {user.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {user.institutionName}
              </p>
            </div>
            <Link href={`/user/${user.id}`}>
              <Button size="sm" variant="ghost" className='text-xs'>
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