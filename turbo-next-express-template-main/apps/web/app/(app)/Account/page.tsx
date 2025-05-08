"use client";
import React, { useState } from 'react';
import { useUser } from "../../../providers/UserProvider";
import { PageLoader } from "@repo/frontend/components/PageLoader";
import { Button } from "@repo/frontend/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/frontend/components/ui/avatar";
import { Input } from "@repo/frontend/components/ui/input";
import { toast } from 'sonner';

export default function AccountPage() {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setUser({ ...user, profilePicture: imageUrl });
            toast.success("Profile picture updated!");
            setLoading(false);
        };
        reader.onerror = () => {
            toast.error("Failed to upload profile picture.");
            setLoading(false);
        };
        reader.readAsDataURL(file);
    };

    if (loading) return <PageLoader />;
    if (!user) return <div className="p-4">User not found.</div>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>

            <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={user.profilePicture} alt="Profile picture" />
                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                {isEditing ? (
                    <>
                        <Input
                            id="profilePictureInput"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureUpload}
                            className="hidden"
                        />
                        <label htmlFor="profilePictureInput">
                            <Button
                                variant="outline"
                                disabled={loading}
                                onClick={() => document.getElementById('profilePictureInput')?.click()}
                            >
                                {loading ? "Uploading..." : "Change Picture"}
                            </Button>
                        </label>
                    </>
                ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                )}
            </div>

            <div className="space-y-2 text-gray-700">
                <p>
                    <strong>ID:</strong> {user.id}
                </p>
                <p>
                    <strong>Name:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );
}
