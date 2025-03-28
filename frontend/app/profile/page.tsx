"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Define user type based on your application's user structure
type User = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("authToken");

      if (!userData || !token) {
        router.push("/login");
        return;
      }

      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      toast.success("Logged out successfully", {
        style: {
          backgroundColor: "#1e1e2f",
          color: "#f9fafb",
          border: "1px solid #374151",
          borderRadius: "0.75rem",
        },
      });

      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center py-4 px-8 bg-gray-900/80 backdrop-blur-sm fixed top-0 z-50"
      >
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          >
            EduNexus
          </motion.div>
        </Link>

        <div className="flex gap-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md text-gray-300 border border-gray-700 hover:bg-gray-800"
            >
              Home
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-red-600/80 to-red-700/80 text-white hover:from-red-600 hover:to-red-700"
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Profile Content */}
      <div className="pt-32 pb-20 px-8 relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
          <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white">
                  {user?.firstName?.charAt(0)}
                  {user?.lastName?.charAt(0)}
                </div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-grow">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
                >
                  {user?.firstName} {user?.lastName}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-900/50 border border-purple-500/30 text-purple-200">
                    {user?.role}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                >
                  <div>
                    <h3 className="text-gray-400 text-sm">Username</h3>
                    <p className="text-white">{user?.username}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Email</h3>
                    <p className="text-white">{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">User ID</h3>
                    <p className="text-white font-mono text-sm">{user?.id}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Course Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-gray-800/50 rounded-xl border border-gray-700 p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Your Courses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course progress cards would go here */}
              <div className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">Introduction to Java</h3>
                  <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">
                    In Progress
                  </span>
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">65% Complete</div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                  Continue Learning
                </Button>
              </div>

              <div className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium">Blockchain Fundamentals</h3>
                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded">
                    New
                  </span>
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: "10%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">10% Complete</div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                  Continue Learning
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                  Browse More Courses
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Account Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 bg-gray-800/50 rounded-xl border border-gray-700 p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <div className="space-y-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">Update Profile</h3>
                  <p className="text-sm text-gray-400">
                    Change your personal information
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Edit
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">Change Password</h3>
                  <p className="text-sm text-gray-400">Update your password</p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Change
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-800/80 rounded-lg border border-gray-700 p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">Notification Settings</h3>
                  <p className="text-sm text-gray-400">
                    Manage your notification preferences
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Configure
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
