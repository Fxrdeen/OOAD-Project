"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Book, PenLine, Users } from "lucide-react";

// Navbar component
const Navbar = ({
  isAuthenticated,
  user,
  handleLogout,
}: {
  isAuthenticated: boolean;
  user: any;
  handleLogout: () => void;
}) => {
  return (
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

      <div className="flex gap-8">
        <Link href="/courses" className="text-gray-300 hover:text-white">
          Explore Courses
        </Link>
        <Link href="/instructor" className="text-white font-medium">
          Your Courses
        </Link>
        <Link href="/about" className="text-gray-300 hover:text-white">
          About
        </Link>
        <Link href="/contact" className="text-gray-300 hover:text-white">
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link href="/profile" className="text-gray-300 hover:text-white">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
            <Link href="/register" className="text-gray-300 hover:text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};

// Footer component
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="w-full bg-gray-900 text-gray-400 py-12 px-8 mt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            EduNexus
          </h3>
          <p>Empowering education through technology.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Facebook
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center">
        <p>© 2023 EduNexus. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

// Course Card component for instructors
const InstructorCourseCard = ({
  course,
  index,
}: {
  course: Course;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 flex flex-col md:flex-row mb-6"
    >
      <div className="w-full md:w-64 h-48 md:h-auto bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center flex-shrink-0">
        <span className="text-5xl opacity-30">📚</span>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{course.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
            {course.difficulty}
          </span>
          <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
            {course.lessons} lessons
          </span>
          <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
            {course.hours} hours
          </span>
          <span className="px-2 py-1 bg-gradient-to-r from-green-600/40 to-green-800/40 rounded-md text-xs text-gray-100">
            {course.price}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-500">
            {"★".repeat(Math.floor(course.rating))}
            {"☆".repeat(5 - Math.floor(course.rating))}
          </div>
          <span className="text-sm text-gray-400">
            ({course.rating.toFixed(1)})
          </span>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <Link href={`/instructor/courses/${course.id}/students`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600/80 to-indigo-800/80 text-white hover:from-indigo-600 hover:to-indigo-800 flex items-center gap-2"
            >
              <Users size={16} />
              View Students
            </motion.button>
          </Link>

          <Link href={`/courses/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gray-700/80 text-white hover:bg-gray-700 flex items-center gap-2"
            >
              <Book size={16} />
              Preview
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const YourCourses = () => {
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    // Check authentication status
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      setIsAuthenticated(!!token);
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Fetch instructor's courses
        const fetchInstructorCourses = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `http://localhost:8090/courses/instructor/${parsedUser.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const data = await response.json();
              setInstructorCourses(data);
            }
          } catch (error) {
            console.error("Failed to fetch instructor courses:", error);
            toast.error("Failed to fetch your courses", {
              className: "bg-gray-800 text-white border border-gray-700",
              duration: 3000,
            });
          } finally {
            setLoading(false);
          }
        };

        fetchInstructorCourses();
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-12 px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
          <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
            >
              Your Courses
            </motion.h1>

            <Link href="/instructor/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
              >
                Create New Course
              </motion.button>
            </Link>
          </div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Manage your courses, track student progress, and create new content.
          </motion.p>
        </div>
      </motion.div>

      {/* Courses List */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {instructorCourses.length > 0 ? (
          <div className="space-y-6">
            {instructorCourses.map((course, index) => (
              <InstructorCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-2">No courses yet</h3>
            <p className="text-gray-400 mb-6">
              Start creating your first course to begin your teaching journey.
            </p>
            <Link href="/instructor/create">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Create Your First Course
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default YourCourses;
