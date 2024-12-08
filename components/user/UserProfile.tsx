'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, GraduationCap, MapPin, Mail, Link as LinkIcon, School, Verified } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getUserData, getUserProfile } from "@/lib/firebase-utils";

interface UserProfileProps {
  userId: string;
}

interface UserProfileData {
  email: string;
  institutionName: string;
  profile: {
    firstName: string;
    lastName: string;
    headline?: string;
    location?: string;
    email?: string;
    website?: string;
    bio?: string;
    physicalAddress?: string;
  };
  employment: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  qualification: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    skills?: string[];
  }[];
}

export function UserProfile({ userId }: UserProfileProps) {
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

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
      {/* Header/Cover Section */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg" />

      {/* Profile Info Card */}
      <Card className="relative px-6 py-4 -mt-24">
        <div className="flex flex-col gap-4">
          <div className="relative -mt-16">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
              <Image
                src="/assets/images/user.png"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex-1 mt-2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold">
                  {profileData.profile.firstName} {profileData.profile.lastName} <Verified className="w-5 h-5 text-primary" />
                </h1>
                <p className="text-muted-foreground">{profileData.profile.headline}</p>
                <div className="flex flex-col gap-2 mt-2 text-xs text-muted-foreground">
                  {profileData.profile.physicalAddress && (
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
              <Button>Connect</Button>
            </div>
          </div>
        </div>

        {profileData.profile.bio && (
          <div className="mt-6">
            <p className="text-sm">{profileData.profile.bio}</p>
          </div>
        )}
      </Card>

      {/* Experience Section */}
      {profileData.employment && profileData.employment.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {profileData.employment.map((job, index) => (
              <div key={index} className="relative">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.position}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.startDate} - {job.endDate || "Present"}
                    </p>
                    {job.description && (
                      <p className="mt-2 text-sm">{job.description}</p>
                    )}
                  </div>
                </div>
                {index < profileData.employment.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education Section */}
      {profileData.qualification && profileData.qualification.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h2>
          <div className="mt-4 space-y-6">
            {profileData.qualification.map((edu, index) => (
              <div key={index} className="relative">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                    {edu.skills && edu.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {edu.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {index < profileData.qualification.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
