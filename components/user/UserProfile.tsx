'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, MapPin, Mail, School, Verified, MessageSquare, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getUserData } from "@/lib/firebase-utils";
import { ProfileFormValues } from "../forms/profile/schema";
import { EmploymentFormValues } from "../forms/employment/schema";
import { QualificationFormValues } from "../forms/qualification/schema";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface UserProfileProps {
  userId: string;
}

interface UserProfileData {
  email: string;
  name: string;
  photoURL: string;
  institutionName: string;
  profile: ProfileFormValues;
  employment: EmploymentFormValues;
  qualification: QualificationFormValues;
}

export function UserProfile({ userId }: UserProfileProps) {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserData(userId);

        setProfileData(data as UserProfileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="">
      <div className="relative h-56 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/assets/images/profile-bg.jpeg')" }} />
      <Card className="relative px-6 py-4 -mt-24">
        <div className="flex flex-col gap-4">
          <div className="relative -mt-16">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-muted overflow-hidden">
              <Avatar>
                <AvatarImage src={profileData?.photoURL || ""} alt={profileData?.name || "User"} />
                <AvatarFallback>{profileData?.name[0].toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex-1 mt-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                  {profileData.name} <Verified className="w-5 h-5 text-primary" />
                </h1>
                <div className="flex flex-col gap-2 mt-2 text-xs text-muted-foreground">
                  {profileData.profile?.physicalAddress && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.profile.physicalAddress}</span>
                    </div>
                  )}
                  {profileData.institutionName && (
                    <div className="flex items-center gap-1">
                      <School className="w-4 h-4" />
                      <span>Attended {profileData.institutionName}</span>
                    </div>
                  )}
                  {profileData.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${profileData.email}`} className="hover:underline">
                        {profileData.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 absolute top-2 right-2">
                <Link href={`/messages/${userId}`}>
                  <Button size="sm">Message <MessageSquare className="w-5 h-5 pl-1" /> </Button>
                </Link>
                {user && user.uid === userId && (
                  <Link href="/edit-profile">
                    <Button variant="secondary" size="sm">Edit Profile <Pencil className="w-5 h-5 pl-1" /> </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {profileData?.employment && profileData?.employment?.employment?.length > 0 && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {profileData.employment.employment.map((job, index) => (
              <div key={index} className="relative">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.jobTitle}</h3>
                    <p className="text-muted-foreground">{job.nameOfOrganisation}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.startDate} - {job.endDate || "Present"}
                    </p>
                    {job.jobDescription && (
                      <p className="mt-2 text-sm">{job.jobDescription}</p>
                    )}
                  </div>
                </div>
                {index < profileData.employment.employment.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {profileData?.qualification?.education && profileData?.qualification?.education?.length > 0 && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          <div className="mt-4 space-y-6">
            {profileData.qualification.education.map((edu, index) => (
              <div key={index} className="relative">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{edu.institutionName}</h3>
                    <p className="text-muted-foreground">{edu.courseOfStudy}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.yearOfEntry} - {edu.yearOfGraduation || "Present"}
                    </p>
                  </div>
                </div>
                {index < profileData.qualification.education.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {profileData?.qualification?.skills && (profileData?.qualification?.skills?.length > 0) && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Skills
          </h2>
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {profileData.qualification.skills?.map((skill, index) => (
                <Badge key={`profile-${index}`} variant="secondary">
                  {skill.specialSkillAcquired}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
