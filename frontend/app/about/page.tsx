"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Code, Trophy, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
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
            Teach
          </Link>
          <Link href="/about" className="text-white font-medium">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link href="/register" className="text-gray-300 hover:text-white">
            Register
          </Link>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text mb-4">
            About EduNexus
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering learners through accessible, engaging, and high-quality
            online education.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Our Mission
            </h2>
            <p className="text-gray-300 mb-4">
              EduNexus was founded with a simple yet powerful mission: to make
              quality education accessible to everyone, everywhere. We believe
              that knowledge should not be limited by geographical, economic, or
              social barriers.
            </p>
            <p className="text-gray-300">
              Our platform brings together expert instructors and eager learners
              in an interactive, supportive environment designed to foster
              growth and success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Our Story
            </h2>
            <p className="text-gray-300 mb-4">
              Started in 2023 by a team of educators and technology enthusiasts,
              EduNexus has grown from a small collection of courses to a
              comprehensive learning platform serving thousands of students
              worldwide.
            </p>
            <p className="text-gray-300">
              We continuously evolve our platform based on feedback from our
              community, ensuring we meet the ever-changing needs of modern
              learners.
            </p>
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
          What Makes Us Different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: <BookOpen className="h-10 w-10 text-purple-500" />,
              title: "Quality Content",
              description: "Courses designed and reviewed by industry experts",
            },
            {
              icon: <Trophy className="h-10 w-10 text-blue-500" />,
              title: "Interactive Learning",
              description: "Engaging quizzes and hands-on projects",
            },
            {
              icon: <Code className="h-10 w-10 text-green-500" />,
              title: "Real-world Skills",
              description: "Practical knowledge you can apply immediately",
            },
            {
              icon: <Users className="h-10 w-10 text-yellow-500" />,
              title: "Supportive Community",
              description:
                "Connect with peers and mentors who share your interests",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 text-center backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-gray-700 p-8 text-center backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of students who are already expanding their knowledge
            and advancing their careers with EduNexus.
          </p>
          <Link href="/courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium"
            >
              Explore Our Courses
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
