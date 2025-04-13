"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Course, EnrolledCourse } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
        <Link href="/enrolled" className="text-white font-medium">
          Enrolled Courses
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

// Course Card component
const CourseCard = ({
  course,
  index,
  courseData,
  handleDeEnroll,
}: {
  course: Course;
  index: number;
  courseData: EnrolledCourse[];
  handleDeEnroll: (
    userId: string,
    courseId: string,
    hasProgress: boolean
  ) => void;
}) => {
  const [user, setUser] = useState<any>(null);
  const [hasCompletedLessons, setHasCompletedLessons] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Get user data from local storage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }

    // Check if this course has any completed lessons
    const enrollmentData = courseData.find((c) => c.courseId === course.id);
    setHasCompletedLessons(enrollmentData?.hasProgress || false);
  }, [course.id, courseData]);

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
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-500">
            {"★".repeat(Math.floor(course.rating))}
            {"☆".repeat(5 - Math.floor(course.rating))}
          </div>
          <span className="text-sm text-gray-400">
            ({course?.rating?.toFixed(1)})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/enrolled/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white hover:from-purple-600 hover:to-blue-600"
            >
              Continue Learning
            </motion.button>
          </Link>

          <div className="relative">
            <motion.button
              whileHover={!hasCompletedLessons ? { scale: 1.05 } : undefined}
              className={`px-4 py-2 rounded-md border ${
                hasCompletedLessons
                  ? "bg-gray-700/50 border-gray-600 text-gray-500 cursor-not-allowed"
                  : "bg-red-900/30 border-red-800/50 text-red-300 hover:bg-red-900/50 hover:border-red-700"
              }`}
              onClick={() => {
                if (!hasCompletedLessons && user) {
                  handleDeEnroll(user.id, course.id, hasCompletedLessons);
                }
              }}
              onMouseEnter={() => hasCompletedLessons && setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              De-enroll
            </motion.button>

            {showTooltip && hasCompletedLessons && (
              <div className="absolute -top-12 right-0 w-60 p-2 bg-gray-900 border border-gray-700 rounded-md shadow-lg text-sm text-gray-300">
                You have already completed lessons from this course
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EnrolledPage = () => {
  const [courseData, setCourseData] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  const handleDeEnroll = async (
    userId: string,
    courseId: string,
    hasProgress: boolean
  ) => {
    if (hasProgress) return; // Safety check, don't de-enroll if there's progress

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Authentication required to de-enroll", {
          className: "bg-gray-800 text-white border border-gray-700",
        });
        return;
      }

      // Show confirmation dialog using toast
      toast.promise(
        async () => {
          const response = await fetch(
            `http://localhost:8090/enroll/${userId}/${courseId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to de-enroll from course");
          }

          // Update local state to remove the de-enrolled course
          setCourseData((prev) =>
            prev.filter((course) => course.courseId !== courseId)
          );
          setEnrolledCourses((prev) =>
            prev.filter((course) => course.id !== courseId)
          );

          return "Successfully de-enrolled from course";
        },
        {
          loading: "De-enrolling from course...",
          success: (message) => message,
          error: "Failed to de-enroll. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error de-enrolling from course:", error);
      toast.error("Failed to de-enroll from course", {
        className: "bg-gray-800 text-white border border-gray-700",
      });
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

        // Fetch enrolled courses
        const fetchEnrolledCourses = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `http://localhost:8090/enroll/user/${parsedUser.id}`
            );
            if (response.ok) {
              const data = await response.json();

              // Check for lesson progress for each enrollment
              const enrollmentPromises = data.map(
                async (enrollment: EnrolledCourse) => {
                  const progressResponse = await fetch(
                    `http://localhost:8090/lesson-progress/${parsedUser.id}/${enrollment.courseId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  if (progressResponse.ok) {
                    const progressData = await progressResponse.json();
                    // Mark enrollment as having progress if any lessons are completed
                    return {
                      ...enrollment,
                      hasProgress: progressData && progressData.length > 0,
                    };
                  }

                  return {
                    ...enrollment,
                    hasProgress: false,
                  };
                }
              );

              const enhancedData = await Promise.all(enrollmentPromises);
              setCourseData(enhancedData);

              // Create an array to store all course fetch promises
              const coursePromises = enhancedData.map(
                (course: EnrolledCourse) =>
                  fetch(`http://localhost:8090/courses/${course.courseId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }).then((res) => res.json())
              );

              // Wait for all course data to be fetched
              const coursesData = await Promise.all(coursePromises);
              setEnrolledCourses(coursesData);
            }
          } catch (error) {
            console.error("Failed to fetch enrolled courses:", error);
            toast.error("Failed to fetch enrolled courses");
          } finally {
            setLoading(false);
          }
        };

        fetchEnrolledCourses();
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
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
          >
            My Enrolled Courses
          </motion.h1>
        </div>
      </motion.div>

      {/* Courses List */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {enrolledCourses.length > 0 ? (
          <div className="space-y-6">
            {enrolledCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                course={course}
                index={index}
                courseData={courseData}
                handleDeEnroll={handleDeEnroll}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-2">No courses enrolled</h3>
            <p className="text-gray-400 mb-6">
              Browse our courses and start your learning journey today!
            </p>
            <Link href="/courses">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Browse Courses
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnrolledPage;
