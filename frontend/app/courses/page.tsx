"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Course } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
        <Link href="/courses" className="text-white font-medium">
          Explore Courses
        </Link>
        {user.role === "INSTRUCTOR" && (
          <Link href="/instructor" className="text-gray-300 hover:text-white">
            Your Courses
          </Link>
        )}
        {user.role === "STUDENT" && (
          <Link href="/enrolled" className="text-gray-300 hover:text-white">
            Enrolled Courses
          </Link>
        )}
        <Link href="/about" className="text-gray-300 hover:text-white">
          About
        </Link>

        <Link href="/contact" className="text-gray-300 hover:text-white">
          Contact
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30"
          >
            <span className="text-sm font-medium text-white">
              Welcome, {user.firstName}
            </span>
          </motion.div>
          <Link href="/profile">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white hover:from-purple-600 hover:to-blue-600"
            >
              Profile
            </motion.button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md text-gray-300 border border-gray-700 hover:bg-gray-800"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

// Course Card component
const CourseCard = ({ course, index }: { course: Course; index: number }) => {
  // Mock data for additional course information
  const mockData = {
    price: `${course.price}`,
    lessons: course.lessons,
    hours: course.hours,
    level: course.difficulty,
    rating: course.rating.toFixed(1),

    lastUpdated: `${
      ["January", "February", "March", "April", "May"][index % 5]
    } 2023`,
  };

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
            {mockData.level}
          </span>
          <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
            {mockData.lessons} lessons
          </span>
          <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
            {mockData.hours} hours
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-500">
            {"★".repeat(Math.floor(parseFloat(mockData.rating)))}
            {"☆".repeat(5 - Math.floor(parseFloat(mockData.rating)))}
          </div>
          <span className="text-sm text-gray-400">({mockData.rating})</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">{mockData.price}</div>
          <Link href={`/courses/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white hover:from-purple-600 hover:to-blue-600"
            >
              View Course
            </motion.button>
          </Link>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Last updated: {mockData.lastUpdated}
        </div>
      </div>
    </motion.div>
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

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  // Fetch courses from backend
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8090/courses");
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredCourses(courses);
      return;
    }

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    getAllCourses();

    // Check authentication status on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      setIsAuthenticated(!!token);
      setUser(userData ? JSON.parse(userData) : {});
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
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
          >
            Explore Our Courses
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Discover a wide range of courses designed to help you master new
            skills and advance your career.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-2xl mb-12 relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white w-full"
              />
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-400">
                Found {filteredCourses.length} course
                {filteredCourses.length !== 1 ? "s" : ""}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Courses List */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">
              We couldn't find any courses matching your search criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilteredCourses(courses);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Clear Search
            </Button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
