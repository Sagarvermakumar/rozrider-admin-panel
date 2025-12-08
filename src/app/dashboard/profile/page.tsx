"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { User, Phone, Mail, Settings, Shield, Bell, Star, Car } from "lucide-react";

export default function AdminProfilePage() {
  return (
    <div className="w-full flex flex-col space-y-6 px-3 py-6">

      {/* ================= HEADER ================= */}
      <Card className="w-full bg-gradient-to-b from-[#111] to-[#0c0c0c] border-white/10">
        <CardContent className="flex flex-col sm:flex-row items-center gap-6 py-6">
          
          <Avatar className="h-24 w-24 border border-white/20">
            <AvatarImage src="https://api.dicebear.com/7.x/identicon/svg?seed=admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>

          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">Admin - RozRider</h2>
            <p className="text-muted-foreground">System Administrator</p>
          </div>
        </CardContent>
      </Card>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">

        <Card className="bg-[#111] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Trips</CardTitle>
            <Car className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1,240</p>
            <p className="text-xs text-muted-foreground">All-time</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Earnings</CardTitle>
            <Star className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹ 4,52,300</p>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card className="bg-[#111] border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Rating</CardTitle>
            <Star className="h-5 w-5 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.9</p>
            <p className="text-xs text-muted-foreground">Driver & Rider Feedback</p>
          </CardContent>
        </Card>

      </div>

      {/* ================= PERSONAL INFO ================= */}
      <Card className="bg-[#111] border-white/10">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Admin Name" defaultValue="Admin" />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="admin@rozrider.com" defaultValue="admin@rozrider.com" />
            </div>

            <div>
              <Label>Phone</Label>
              <Input placeholder="+91 9876543210" defaultValue="+91 90XXXXXXXX" />
            </div>

            <div>
              <Label>Role</Label>
              <Input disabled value="Administrator" className="opacity-70" />
            </div>
          </div>

          <Button className="w-full sm:w-auto mt-4">Save Changes</Button>
        </CardContent>
      </Card>

      {/* ================= SETTINGS ================= */}
      <Card className="bg-[#111] border-white/10">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" /> Notifications
              </p>
              <p className="text-xs text-muted-foreground">Receive updates & alerts</p>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Security */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" /> Login Security
              </p>
              <p className="text-xs text-muted-foreground">Enable 2-factor authentication</p>
            </div>
            <Switch />
          </div>

          {/* System Settings */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Settings className="h-4 w-4" /> Dark Mode
              </p>
              <p className="text-xs text-muted-foreground">Theme based UI</p>
            </div>
            <Switch defaultChecked />
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
