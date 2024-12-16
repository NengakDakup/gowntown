'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getAllUsers } from '@/lib/firebase-utils'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Loader2, MapPin, ArrowRight, ChevronDown } from 'lucide-react'
import MainLayout from '@/components/layouts/MainLayout'

interface UserData {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  institutionName: string;
  profile: {
    aboutYou: string;
    title: string;
    physicalAddress: string;
    officeAddress: string;
  };
  employment: {
    position: string;
    company: string;
  };
  qualification: {
    degree: string;
    field: string;
    institution: string;
  };
}

export default function Network() {
  const [users, setUsers] = useState<UserData[]>([])
  const [displayedUsers, setDisplayedUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const { user: currentUser } = useAuth()
  const usersPerPage = 10

  useEffect(() => {
    async function fetchUsers() {
      try {
        const fetchedUsers = await getAllUsers() as UserData[];
        const filteredUsers = currentUser
          ? fetchedUsers.filter(user => user.id !== currentUser.uid)
          : fetchedUsers;
        const shuffledUsers = filteredUsers.sort(() => Math.random() - 0.5);
        setUsers(shuffledUsers);
        setDisplayedUsers(shuffledUsers.slice(0, usersPerPage));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, [currentUser]);

  const loadMore = () => {
    const nextUsers = users.slice(0, (page + 1) * usersPerPage);
    setDisplayedUsers(nextUsers);
    setPage(page + 1);
  };

  if (loading) {
    return (
      <MainLayout showRightContent={false}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showRightContent={false}>
      <div className="container py-8">
        <h1 className="text-xl font-bold mb-8">My Network</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedUsers.map((user) => (
            <Card key={user.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header with Avatar and Name */}
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage className='w-16 h-16 object-cover' src={user.photoURL} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold truncate">{user.name}</h2>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.institutionName}
                    </p>
                  </div>
                </div>

                {/* Bio Section */}
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {user.profile?.aboutYou || 'No bio provided'}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.profile?.physicalAddress || 'No address provided'}</span>
                  </div>
                </div>

                {/* View Profile Button */}
                <div className="pt-2">
                  <Link href={`/user/${user.id}`}>
                    <Button className="w-full" variant="default">
                      View Full Profile <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {users.length > displayedUsers.length && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={loadMore}
              variant="outline"
              size="sm"
            >
              View More <ChevronDown />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}