"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Course, Users } from "@/types";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Globe,
  PlayCircle,
  Star,
  User,
} from "lucide-react";

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
          Courses
        </Link>

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

// Curriculum Section component
const CurriculumSection = () => {
  // Dummy curriculum data
  const sections = [
    {
      title: "Getting Started",
      lessons: [
        {
          title: "Introduction to the Course",
          duration: "10:15",
          preview: true,
        },
        {
          title: "Setting Up Your Environment",
          duration: "15:30",
          preview: false,
        },
        { title: "Understanding the Basics", duration: "12:45", preview: true },
      ],
    },
    {
      title: "Core Concepts",
      lessons: [
        { title: "Fundamental Principles", duration: "18:20", preview: false },
        {
          title: "Building Your First Project",
          duration: "25:10",
          preview: false,
        },
        { title: "Advanced Techniques", duration: "20:45", preview: false },
        {
          title: "Common Patterns and Practices",
          duration: "16:30",
          preview: false,
        },
      ],
    },
    {
      title: "Real-World Applications",
      lessons: [
        {
          title: "Case Study: Enterprise Implementation",
          duration: "22:15",
          preview: false,
        },
        {
          title: "Performance Optimization",
          duration: "19:40",
          preview: false,
        },
        {
          title: "Debugging and Troubleshooting",
          duration: "17:55",
          preview: false,
        },
      ],
    },
    {
      title: "Final Project",
      lessons: [
        {
          title: "Project Planning and Setup",
          duration: "14:25",
          preview: false,
        },
        { title: "Implementation Steps", duration: "28:30", preview: false },
        { title: "Testing and Deployment", duration: "21:15", preview: false },
        {
          title: "Course Conclusion and Next Steps",
          duration: "10:05",
          preview: false,
        },
      ],
    },
  ];

  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    if (expandedSections.includes(index)) {
      setExpandedSections(expandedSections.filter((i) => i !== index));
    } else {
      setExpandedSections([...expandedSections, index]);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>

      <div className="space-y-4">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
            className="border border-gray-700 rounded-lg overflow-hidden"
          >
            <div
              className="bg-gray-800/70 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(sectionIndex)}
            >
              <div className="flex items-center gap-3">
                <div className="text-lg font-medium">{section.title}</div>
                <div className="text-sm text-gray-400">
                  {section.lessons.length} lessons •{" "}
                  {section.lessons
                    .reduce(
                      (acc, lesson) =>
                        acc +
                        parseInt(lesson.duration.split(":")[0]) +
                        parseInt(lesson.duration.split(":")[1]) / 60,
                      0
                    )
                    .toFixed(1)}{" "}
                  hours
                </div>
              </div>
              <div className="text-gray-400">
                {expandedSections.includes(sectionIndex) ? "−" : "+"}
              </div>
            </div>

            {expandedSections.includes(sectionIndex) && (
              <div className="divide-y divide-gray-700">
                {section.lessons.map((lesson, lessonIndex) => (
                  <motion.div
                    key={lessonIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: lessonIndex * 0.05 }}
                    className="p-4 flex justify-between items-center bg-gray-900/50 hover:bg-gray-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle size={18} className="text-gray-400" />
                      <span
                        className={
                          lesson.preview ? "text-white" : "text-gray-300"
                        }
                      >
                        {lesson.title}
                      </span>
                      {lesson.preview && (
                        <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {lesson.duration}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 mb-4">
          {sections.reduce((acc, section) => acc + section.lessons.length, 0)}{" "}
          lessons •{" "}
          {sections
            .reduce(
              (acc, section) =>
                acc +
                section.lessons.reduce(
                  (acc2, lesson) =>
                    acc2 +
                    parseInt(lesson.duration.split(":")[0]) +
                    parseInt(lesson.duration.split(":")[1]) / 60,
                  0
                ),
              0
            )
            .toFixed(1)}{" "}
          hours total length
        </p>
      </div>
    </div>
  );
};

const CoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Users | null>(null);
  const [instructor, setInstructor] = useState<Users | null>(null);

  // Mock course details (will be replaced with actual data)
  const mockCourseDetails = {
    lastUpdated: "June 2023",
    language: "English",
    subtitles: ["English", "Spanish", "French", "German"],
    requirements: [
      "Basic programming knowledge",
      `Familiarity with ${course?.title} concepts`,
      "A computer with internet access",
    ],
    whatYouWillLearn: [
      "Master the fundamentals and advanced concepts",
      "Build real-world projects from scratch",
      "Implement best practices and design patterns",
      "Optimize performance and solve common problems",
      "Deploy your applications to production",
      "Stay up-to-date with the latest industry trends",
    ],
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      router.push("/login");
    }
  };

  // Fetch course data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      setUser(userData ? JSON.parse(userData) : null);
    }
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8090/courses/${params.id}`);
        if (!res.ok) {
          throw new Error("Course not found");
        }
        const data = await res.json();
        setCourse(data);
        // Only try to fetch instructor if we have a valid course with instructor_id
        if (data && data.instructorId) {
          try {
            const instructorRes = await fetch(
              `http://localhost:8090/users/${data.instructorId}`
            );
            if (instructorRes.ok) {
              const instructorData = await instructorRes.json();
              setInstructor(instructorData);
              console.log(instructorData);
            }
          } catch (instructorError) {
            console.error("Failed to fetch instructor:", instructorError);
          }
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
        // Fallback to dummy data for now
        setCourse({
          id: params.id as string,
          title: "Comprehensive Web Development Bootcamp",
          description:
            "Learn web development from the ground up with this comprehensive course. Master HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and gain the skills needed to become a professional web developer.",
          instructor_id: "inst-123",
          difficulty: "Intermediate",
          hours: 42,
          lessons: 87,
          price: "$89.99",
          rating: 4.7,
        });
      } finally {
        setLoading(false);
      }
    };

    // Check authentication status
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      setIsAuthenticated(!!token);
      setUser(userData ? JSON.parse(userData) : {});
    }

    fetchCourse();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-950 text-white">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-400 mb-8">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/courses">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            Browse Courses
          </Button>
        </Link>
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

      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-12 px-8 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Course Info */}
            <div className="flex-grow">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex text-yellow-500 mr-2">
                      {"★".repeat(Math.floor(course.rating))}
                      {"☆".repeat(5 - Math.floor(course.rating))}
                    </div>
                    <span className="text-yellow-500 font-medium">
                      {course.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-gray-400">
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="text-gray-400">
                    <span>{course.difficulty} level</span>
                  </div>
                </div>

                <p className="text-xl text-gray-300 mb-8 max-w-3xl">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold">
                      {instructor?.firstName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">
                        {instructor?.firstName} {instructor?.lastName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {instructor?.role}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-gray-400" />
                    <span>Last updated {mockCourseDetails.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={20} className="text-gray-400" />
                    <span>{mockCourseDetails.language}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:w-96 bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden shadow-xl backdrop-blur-sm sticky top-24 self-start"
            >
              <div className="h-52 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                <span className="text-6xl opacity-30">📚</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-3xl font-bold">{course.price}</div>
                </div>

                <div className="space-y-4">
                  {user?.role === "INSTRUCTOR" ? (
                    <Button
                      className="w-full bg-gray-600 py-6 text-lg"
                      disabled
                    >
                      Cannot Enroll as Instructor
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg"
                      // onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="text-center text-sm text-gray-400">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">This course includes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <PlayCircle size={16} className="text-gray-400" />
                        <span>{course.hours} hours on-demand video</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle size={16} className="text-gray-400" />
                        <span>{course.lessons} lessons</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Globe size={16} className="text-gray-400" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Star size={16} className="text-gray-400" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-gray-800/30 border border-gray-700 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockCourseDetails.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-green-500 mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                {mockCourseDetails.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CurriculumSection />
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-6">Instructor</h2>
              <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-xl font-bold">
                    {instructor?.firstName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {instructor?.firstName} {instructor?.lastName}
                    </h3>
                    <p className="text-gray-400">{instructor?.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar for mobile view */}
          <div className="lg:hidden mt-8">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg">
              Enroll Now for {course.price}
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursePage;
