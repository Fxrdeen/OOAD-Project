"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  Mail,
  UserCircle,
  CalendarClock,
  ArrowLeft,
  CheckCircle,
  Clock,
  BookOpen,
  AlertTriangle,
  XCircle,
  FileQuestion,
  BadgeCheck,
  Trophy,
  Info as InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define types
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

interface Lesson {
  id: string;
  title: string;
  courseId: string;
  chapters: string[];
}

interface LessonProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string;
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

// Lesson Progress Card
const LessonProgressCard = ({
  lesson,
  progress,
  index,
}: {
  lesson: Lesson;
  progress: LessonProgress | undefined;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`p-6 rounded-lg border ${
        progress?.completed
          ? "bg-gray-800/60 border-green-600/30"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              progress?.completed ? "bg-green-700/20" : "bg-gray-700"
            }`}
          >
            {progress?.completed ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <Clock size={20} className="text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">{lesson.title}</h3>
            <p className="text-gray-400 text-sm">
              {lesson.chapters.length} chapters
            </p>
          </div>
        </div>
        <div
          className={`text-sm font-medium ${
            progress?.completed ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {progress?.completed ? "Completed" : "In Progress"}
        </div>
      </div>

      {progress?.completed && (
        <div className="mt-4 text-sm text-gray-400">
          <p>
            Completed on: {new Date(progress.completedAt).toLocaleDateString()}{" "}
            at {new Date(progress.completedAt).toLocaleTimeString()}
          </p>
        </div>
      )}

      {/* Chapter list */}
      <div className="mt-4 space-y-2">
        {lesson.chapters.map((chapter, chIdx) => (
          <div key={chIdx} className="flex items-center gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <span className="text-gray-300">{chapter}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const StudentReportPage = () => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [student, setStudent] = useState<User | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [enrolledDate, setEnrolledDate] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [quizResponse, setQuizResponse] = useState<any>(null);
  const params = useParams();
  console.log(params);
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  const fetchQuizResponse = async () => {
    if (!params.id || !params.studentId) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `http://localhost:8090/quiz/response/${params.id}/${params.studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const text = await response.text();

        if (!text) {
          toast.error("Student has not taken the quiz yet", {
            className: "bg-gray-800 text-white border border-gray-700",
            duration: 3000,
          });
          return;
        }

        try {
          const data = JSON.parse(text);
          if (data && Object.keys(data).length > 0) {
            setQuizResponse(data);
            console.log("Quiz response fetched successfully:", data);
          } else {
            toast.error("Student has not taken the quiz yet", {
              className: "bg-gray-800 text-white border border-gray-700",
              duration: 3000,
            });
          }
        } catch (error) {
          console.error("Error parsing quiz response:", error);
          toast.error("Error loading quiz data", {
            className: "bg-gray-800 text-white border border-gray-700",
            duration: 3000,
          });
        }
      } else {
        toast.error("Failed to fetch quiz response", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching quiz response:", error);
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

        // Fetch student details
        const studentResponse = await fetch(
          `http://localhost:8090/users/${params.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!studentResponse.ok) {
          throw new Error("Failed to fetch student details");
        }

        const studentData = await studentResponse.json();
        setStudent(studentData);

        // Fetch enrollment date
        const enrollmentResponse = await fetch(
          `http://localhost:8090/enroll/${params.studentId}/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (enrollmentResponse.ok) {
          const enrollmentData = await enrollmentResponse.json();
          setEnrolledDate(enrollmentData.enrolledAt);
        }

        // Fetch all lessons for the course
        const lessonsResponse = await fetch(
          `http://localhost:8090/lessons/course/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (lessonsResponse.ok) {
          const lessonsData = await lessonsResponse.json();
          setLessons(lessonsData);
        }

        // Fetch lesson progress
        const progressResponse = await fetch(
          `http://localhost:8090/lesson-progress/${params.studentId}/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setLessonProgress(progressData);

          // Calculate completion percentage
          const completedLessons = progressData.filter(
            (item: any) => item.completed
          ).length;
          const percentage =
            lessons.length > 0
              ? Math.round((completedLessons / lessons.length) * 100)
              : 0;
          setCompletionPercentage(percentage);
        }

        await fetchQuizResponse();
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load student report data", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, params.studentId, router]);

  const findLessonProgress = (lessonId: string) => {
    return lessonProgress.find((progress) => progress.lessonId === lessonId);
  };

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
            href={`/instructor/courses/${params.id}/students`}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            <span>Back to Students</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
              >
                Student Progress Report
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-300"
              >
                {course?.title}
              </motion.p>
            </div>

            {student && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800/60 rounded-lg border border-gray-700 p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {student.firstName && student.lastName
                    ? `${student.firstName[0]}${student.lastName[0]}`
                    : student.username?.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-gray-400">{student.email}</p>
                  <p className="text-sm text-gray-500">
                    Enrolled on: {new Date(enrolledDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Progress Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/40 rounded-lg border border-gray-700 p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Course Progress</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">{lessons.length}</div>
                <div className="text-gray-400 text-sm">Total Lessons</div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">
                  {lessonProgress.filter((lp) => lp.completed).length}
                </div>
                <div className="text-gray-400 text-sm">Completed Lessons</div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">
                  {lessons.length -
                    lessonProgress.filter((lp) => lp.completed).length}
                </div>
                <div className="text-gray-400 text-sm">Remaining Lessons</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Lesson Progress Details */}
      <div className="max-w-7xl mx-auto px-8 pb-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-2xl font-bold mb-6"
        >
          Lesson Details
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {lessons.map((lesson, index) => (
            <LessonProgressCard
              key={lesson.id}
              lesson={lesson}
              progress={findLessonProgress(lesson.id)}
              index={index}
            />
          ))}
        </div>

        {/* Quiz Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gray-800/40 rounded-lg border border-gray-700 p-6 mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <FileQuestion size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold">Course Quiz</h2>
          </div>

          {quizResponse ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Final Assessment
                  </h3>
                  <p className="text-gray-400">
                    Quiz results and performance analysis
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full ${
                    quizResponse.score / quizResponse.answers.length >= 0.7
                      ? "bg-green-700/20 border border-green-700/20 text-green-400"
                      : "bg-yellow-700/20 border border-yellow-700/20 text-yellow-400"
                  } font-medium`}
                >
                  Score: {quizResponse.score}/{quizResponse.answers.length} (
                  {Math.round(
                    (quizResponse.score / quizResponse.answers.length) * 100
                  )}
                  %)
                </div>
              </div>

              <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center">
                    <Trophy
                      size={32}
                      className={`${
                        quizResponse.score / quizResponse.answers.length >= 0.7
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Quiz Completed</h3>
                    <p className="text-gray-400">
                      {quizResponse.score / quizResponse.answers.length >= 0.7
                        ? "The student has successfully passed the assessment."
                        : "The student needs improvement in some areas."}
                    </p>
                  </div>
                </div>

                {/* Performance chart */}
                <div className="mb-8">
                  <h4 className="text-md font-semibold mb-3 text-white">
                    Performance Summary
                  </h4>
                  <div className="w-full bg-gray-700 h-6 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-end px-3 text-xs font-bold"
                      style={{
                        width: `${
                          (quizResponse.score / quizResponse.answers.length) *
                          100
                        }%`,
                      }}
                    >
                      {Math.round(
                        (quizResponse.score / quizResponse.answers.length) * 100
                      )}
                      %
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Detailed answers */}
                <div>
                  <h4 className="text-md font-semibold mb-4 text-white">
                    Question Analysis
                  </h4>
                  <div className="space-y-4">
                    {quizResponse.answers.map((answer: any, index: any) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          answer.answer === answer.userAnswer
                            ? "bg-green-900/10 border-green-800/30"
                            : "bg-red-900/10 border-red-800/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              answer.answer === answer.userAnswer
                                ? "bg-green-900/30 text-green-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {answer.answer === answer.userAnswer ? (
                              <CheckCircle size={16} />
                            ) : (
                              <XCircle size={16} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="text-white font-medium mb-2">
                              Question {index + 1}: {answer.question}
                            </h5>

                            <div className="grid gap-2 mb-3">
                              {answer.options.map(
                                (option: any, optIndex: any) => (
                                  <div
                                    key={optIndex}
                                    className={`text-sm px-3 py-2 rounded-md ${
                                      option === answer.answer
                                        ? "bg-green-900/20 text-green-300 border border-green-900/30"
                                        : option === answer.userAnswer &&
                                          option !== answer.answer
                                        ? "bg-red-900/20 text-red-300 border border-red-900/30"
                                        : "bg-gray-800 text-gray-400 border border-gray-700"
                                    }`}
                                  >
                                    {option}
                                    {option === answer.answer && (
                                      <span className="ml-2 text-xs text-green-400">
                                        (Correct Answer)
                                      </span>
                                    )}
                                    {option === answer.userAnswer &&
                                      option !== answer.answer && (
                                        <span className="ml-2 text-xs text-red-400">
                                          (Student's Answer)
                                        </span>
                                      )}
                                  </div>
                                )
                              )}
                            </div>

                            {answer.answer !== answer.userAnswer && (
                              <div className="text-sm text-gray-400 mt-2">
                                <span className="font-medium text-red-400">
                                  Incorrect Answer.
                                </span>{" "}
                                The student chose "{answer.userAnswer}" instead
                                of the correct answer "{answer.answer}".
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback section */}
                <div className="mt-8 p-4 bg-blue-900/10 border border-blue-800/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <InfoIcon
                      size={20}
                      className="text-blue-400 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h5 className="text-white font-medium mb-1">
                        Teaching Insights
                      </h5>
                      <p className="text-sm text-gray-400">
                        {quizResponse.score / quizResponse.answers.length >= 0.7
                          ? "The student has demonstrated good understanding of the course material. Consider offering additional advanced resources to challenge them further."
                          : "The student appears to be struggling with some concepts. Consider scheduling a review session to address the topics covered in their incorrect answers."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Final Assessment
                  </h3>
                  <p className="text-gray-400">
                    Test your knowledge and complete the course
                  </p>
                </div>
                <div className="px-4 py-2 rounded-full bg-red-700/20 border border-red-700/20 text-red-400 font-medium">
                  Quiz Not Taken
                </div>
              </div>

              <div className="bg-gray-800/80 rounded-lg p-6 border border-gray-700">
                <AlertTriangle
                  size={64}
                  className="text-yellow-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center mb-2">
                  Quiz Not Completed
                </h3>
                <p className="text-gray-400 text-center mb-6">
                  The student has completed all lessons but hasn't taken the
                  final quiz yet.
                </p>

                <p className="text-sm text-gray-500 text-center">
                  Remind the student to complete the quiz to receive their
                  certificate.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StudentReportPage;
