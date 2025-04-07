"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Course } from "@/types";
import Link from "next/link";
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
      >
        EduNexus
      </motion.div>

      <div className="flex gap-8">
        <Link href="/courses" className="text-gray-300 hover:text-white">
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
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50"
    >
      <div className="h-40 bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
        <span className="text-5xl opacity-30">📚</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
        <p className="text-gray-400 mb-4">{course.description}</p>
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
              <a href="#" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center">
        <p>© 2023 EduNexus. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

// Testimonial component
const Testimonial = ({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
    >
      <div className="flex items-center mb-4">
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic">"{content}"</p>
    </motion.div>
  );
};

// Stats component
const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-center"
    >
      <div className="text-3xl mb-2 text-purple-400">{icon}</div>
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text mb-1">
        {value}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
};

// Feature card component
const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-gray-800/30 border border-gray-700 rounded-xl"
    >
      <div className="text-3xl mb-4 text-purple-400">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8090/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user!}
        handleLogout={handleLogout}
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-20 px-8"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
          <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
          >
            Welcome to EduNexus
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl"
          >
            Unlock your potential with our cutting-edge e-learning platform.
            Access high-quality courses taught by industry experts and take your
            skills to the next level.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4"
          >
            <Link href="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
              >
                Explore Courses
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 rounded-md border border-gray-700 text-gray-300 font-medium"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-7xl mx-auto px-8 py-16"
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Courses</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-md text-gray-300 border border-gray-700 hover:bg-gray-800"
          >
            View All
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: Course, index: number) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 py-20 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center">
            Our Impact in Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard icon="👨‍🎓" value="10,000+" label="Active Students" />
            <StatCard icon="📚" value="200+" label="Courses Available" />
            <StatCard icon="👨‍🏫" value="50+" label="Expert Instructors" />
            <StatCard icon="🌎" value="120+" label="Countries Reached" />
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="max-w-7xl mx-auto px-8 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose EduNexus?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform offers a unique learning experience with features
            designed to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="🎓"
            title="Expert Instructors"
            description="Learn from industry professionals with years of experience in their fields."
          />
          <FeatureCard
            icon="📱"
            title="Learn Anywhere"
            description="Access your courses on any device, anytime, with our responsive platform."
          />
          <FeatureCard
            icon="🏆"
            title="Certification"
            description="Earn recognized certificates upon completion to boost your resume."
          />
          <FeatureCard
            icon="💬"
            title="Community Support"
            description="Join our community forums to discuss and collaborate with peers."
          />
          <FeatureCard
            icon="🔄"
            title="Regular Updates"
            description="Course content is regularly updated to keep up with industry trends."
          />
          <FeatureCard
            icon="📊"
            title="Progress Tracking"
            description="Monitor your learning journey with detailed progress analytics."
          />
        </div>
      </motion.div>

      {/* Courses Section */}

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-8 py-20"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">
          What Our Students Say
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
          Hear from our community of learners about their experience with
          EduNexus.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            name="Sarah Johnson"
            role="Web Developer"
            content="The Java course was exactly what I needed to advance my career. The instructor was knowledgeable and the content was well-structured."
          />
          <Testimonial
            name="Michael Chen"
            role="Data Scientist"
            content="I've taken multiple courses on EduNexus and each one has been exceptional. The platform is intuitive and the community is supportive."
          />
          <Testimonial
            name="Emily Rodriguez"
            role="Blockchain Enthusiast"
            content="The Blockchain course opened up a whole new world for me. I went from knowing nothing to building my own projects in just a few weeks!"
          />
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-20 px-8 mt-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students already learning on EduNexus.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-lg"
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.div>

      {/* Upcoming Courses Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-8 py-20"
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Coming Soon</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-md text-gray-300 border border-gray-700 hover:bg-gray-800"
          >
            Join Waitlist
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex gap-6"
          >
            <div className="w-16 h-16 rounded-lg bg-purple-900/50 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <div className="text-sm text-purple-400 mb-1">
                Advanced Course
              </div>
              <h3 className="text-xl font-bold mb-2">
                Artificial Intelligence Masterclass
              </h3>
              <p className="text-gray-400 mb-3">
                Deep dive into neural networks, machine learning algorithms, and
                AI applications.
              </p>
              <div className="text-sm text-gray-500">Launching in 2 weeks</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex gap-6"
          >
            <div className="w-16 h-16 rounded-lg bg-blue-900/50 flex items-center justify-center text-2xl">
              🔐
            </div>
            <div>
              <div className="text-sm text-blue-400 mb-1">
                Specialized Track
              </div>
              <h3 className="text-xl font-bold mb-2">
                Cybersecurity Professional
              </h3>
              <p className="text-gray-400 mb-3">
                Learn to protect systems and networks from digital attacks and
                security breaches.
              </p>
              <div className="text-sm text-gray-500">Launching in 1 month</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
