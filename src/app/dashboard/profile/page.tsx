"use client";

import { useGetProfileQuery, useUpdatePasswordMutation, useLogoutMutation } from "@/redux/services/adminApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data, isLoading, error } = useGetProfileQuery(undefined);
  const admin = data?.admin;
  const router = useRouter();

  const [updatePassword, { isLoading: isUpdating }] = useUpdatePasswordMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      // Even if API fails, clear local state and redirect to be safe
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      toast.error("Logged out (session cleared)");
      router.push("/login");
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      await updatePassword({ password: newPassword }).unwrap();
      toast.success("Password updated successfully");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) return <div className="p-8">Error loading profile</div>;

  const joinedDate = admin?.created_at ? new Date(admin.created_at).toLocaleDateString() : "N/A";

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 max-w-5xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Admin Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your account settings and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Column: Personal Info */}
        <Card className="md:col-span-2 border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your admin account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 border-2 border-muted">
                <AvatarImage src="/avatars/admin.png" />
                <AvatarFallback className="text-xl">{admin?.name?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">{admin?.name}</h3>
                <p className="text-sm text-muted-foreground">{admin?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                    Admin
                  </span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500/15 text-green-500 hover:bg-green-500/25">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={admin?.name || ''} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={admin?.email || ''} readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value="Super Admin" readOnly className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joined">Member Since</Label>
                <Input id="joined" value={joinedDate} readOnly className="bg-muted/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Security & Actions */}
        <div className="space-y-6">
          <Card className="border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm h-fit">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 dark:border-neutral-800 bg-black/40 backdrop-blur-sm h-fit">
            <CardHeader>
              <CardTitle className="text-red-500">Account Actions</CardTitle>
              <CardDescription>Sign out from your session</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2 border-red-500/50 text-red-500 hover:text-red-500 hover:bg-red-500/10" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
