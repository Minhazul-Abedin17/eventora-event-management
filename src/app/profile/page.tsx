"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Pencil, UserRound, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        toast.error(error.message || "Profile update failed");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="py-20 text-center">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p>Please login first.</p>
        <Button className="mt-4" onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={image || ""} alt={name} />
              <AvatarFallback className="bg-violet-100 text-2xl text-violet-700">
                {name.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Full Name
                  </p>
                  <div className="flex items-center gap-3">
                    <UserRound size={18} className="text-violet-600" />
                    <p>{user.name}</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-500">
                    Email Address
                  </p>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-violet-600" />
                    <p className="break-all">{user.email}</p>
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 w-full sm:w-auto"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={16} className="mr-2" />
                Edit Profile
              </Button>
            </>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-5">

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user.email}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste your image URL"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setName(user.name || "");
                    setImage(user.image || "");
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>

            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
