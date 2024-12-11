'use client';

import React, { useCallback, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CldUploadWidget } from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const ProfilePictureForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadSuccess = useCallback(async (result: any) => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const imageUrl = result.info.secure_url;

      // Update auth profile
      await updateProfile(user, {
        photoURL: imageUrl,
      });

      // Update Firestore document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        photoURL: imageUrl,
      });

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  return (
    <Card className="p-4 mb-6">
      <div className="flex items-center gap-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.photoURL || ""} />
          <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <CldUploadWidget
          uploadPreset="profile_pictures"
          options={{
            maxFiles: 1, // Limit to single file
            maxFileSize: 5_000_000, // 5MB max file size
            resourceType: 'image', // Ensure only images can be uploaded
          }}
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <Button
              onClick={() => open()}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Change Picture"}
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </Card>
  );
}

export default ProfilePictureForm;