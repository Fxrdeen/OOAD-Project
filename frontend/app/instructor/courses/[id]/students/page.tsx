"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Mail, UserCircle, CalendarClock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the types needed for this page
interface EnrolledStudent {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  difficulty: string;
  hours: number;
  lessons: number;
  price: string;
  rating: number;
}

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
        <Link href="/instructor" className="text-gray-300 hover:text-white">
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

// Student Card component
const StudentCard = ({
  student,
  index,
  enrolledAt,
}: {
  student: User;
  index: number;
  enrolledAt: string;
}) => {
  const [showReport, setShowReport] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<any[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const params = useParams();

  const fetchStudentProgress = async () => {
    try {
      setReportLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) return;

      const response = await fetch(
        `http://localhost:8090/lesson-progress/${student.id}/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const progressData = await response.json();
        setLessonProgress(progressData);

        // Calculate completion percentage
        const completedLessons = progressData.filter(
          (item: any) => item.completed
        ).length;
        const totalLessons = progressData.length;
        const percentage =
          totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;
        setCompletionPercentage(percentage);
      }
    } catch (error) {
      console.error("Failed to fetch student progress:", error);
    } finally {
      setReportLoading(false);
    }
  };

  const toggleReport = () => {
    if (!showReport) {
      fetchStudentProgress();
    }
    setShowReport(!showReport);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500/50 transition-all"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold">
          {student.firstName && student.lastName
            ? `${student.firstName[0]}${student.lastName[0]}`
            : student.username?.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            {student.firstName} {student.lastName}
          </h3>
          <p className="text-gray-400">{student.username}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-300">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <span>{student.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserCircle size={16} className="text-gray-400" />
          <span>{student.role}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarClock size={16} className="text-gray-400" />
          <span>Enrolled on {new Date(enrolledAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* View Report Button */}
      <div className="mt-4 flex justify-end">
        <Link
          href={`/instructor/courses/${params.id}/students/${student.id}/report`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm"
          >
            View Progress Report
          </motion.button>
        </Link>
      </div>

      {/* Progress Report Section */}
      {showReport && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-700"
        >
          <h4 className="text-md font-semibold text-white mb-3">
            Course Progress
          </h4>

          {reportLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Completion</span>
                  <span className="text-white font-medium">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              {lessonProgress.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 text-sm">
                  {lessonProgress.map((lesson: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 rounded bg-gray-700/50"
                    >
                      <span className="text-gray-300 truncate pr-3">
                        Lesson {idx + 1}
                      </span>
                      <span
                        className={
                          lesson.completed
                            ? "text-green-400"
                            : "text-yellow-400"
                        }
                      >
                        {lesson.completed ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">
                  No progress data available yet.
                </p>
              )}

              {completionPercentage === 100 && (
                <div className="mt-3 text-center py-2 bg-green-800/20 border border-green-700/30 rounded-md">
                  <span className="text-green-400 font-medium">
                    Course Completed! 🎉
                  </span>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

const CourseStudents = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>(
    []
  );
  const [studentDetails, setStudentDetails] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const params = useParams();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (!token || !userData) {
          toast.error("Please login to continue", {
            className: "bg-gray-800 text-white border border-gray-700",
            duration: 3000,
          });
          router.push("/login");
          return;
        }

        // Set user authentication state
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));

        // Fetch course details
        const courseResponse = await fetch(
          `http://localhost:8090/courses/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!courseResponse.ok) {
          throw new Error("Failed to fetch course");
        }

        const courseData = await courseResponse.json();
        setCourse(courseData);

        // Fetch enrolled students
        const enrolledResponse = await fetch(
          `http://localhost:8090/enroll/students/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!enrolledResponse.ok) {
          throw new Error("Failed to fetch enrolled students");
        }

        const enrolledData = await enrolledResponse.json();
        setEnrolledStudents(enrolledData);

        // Fetch details for each enrolled student
        const studentPromises = enrolledData.map(
          (enrollment: EnrolledStudent) =>
            fetch(`http://localhost:8090/users/${enrollment.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => res.json())
        );

        const studentData = await Promise.all(studentPromises);
        setStudentDetails(studentData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load student data", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

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
          <Link
            href="/instructor"
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            <span>Back to Your Courses</span>
          </Link>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
          >
            Students Enrolled
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-300 mb-2"
          >
            {course?.title}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-2 text-gray-400"
          >
            <span>{studentDetails.length} students enrolled</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Students List */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {studentDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentDetails.map((student, index) => (
              <StudentCard
                key={student.id}
                student={student}
                index={index}
                enrolledAt={
                  enrolledStudents[index]?.enrolledAt ||
                  new Date().toISOString()
                }
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-bold mb-2">
              No students enrolled yet
            </h3>
            <p className="text-gray-400 mb-6">
              Share your course to get students enrolled.
            </p>
            <Link href={`/instructor/courses/${params.id}/manage`}>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Manage Course
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CourseStudents;
