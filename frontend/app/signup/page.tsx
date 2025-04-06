"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Enhanced toast styles that match the app's design
const toastStyle = {
  backgroundColor: "#1e1e2f", // Darker background with slight blue tint
  color: "#f9fafb", // Light text
  border: "1px solid #374151", // Border color
  borderRadius: "0.75rem", // Slightly more rounded
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
  fontSize: "0.95rem",
  padding: "0.75rem 1rem",
};

// Define the form schema with Zod
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  role: z.enum(["STUDENT", "INSTRUCTOR"], {
    message: "Please select a role.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "STUDENT",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      // Make actual API call to Spring backend
      const response = await fetch("http://localhost:8090/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Show success toast
      toast.success("Registration successful! Please log in.", {
        style: toastStyle,
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      // Show error toast
      toast.error("Registration failed. Please try again.", {
        style: toastStyle,
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 relative">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mt-2"
          >
            Join EduNexus to start your learning journey
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg backdrop-blur-sm"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Choose a username"
                        {...field}
                        className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        {...field}
                        className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        {...field}
                        className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Account Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </motion.div>
            </form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 text-center text-sm"
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 hover:underline"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
