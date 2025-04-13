"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.", {
        className: "bg-gray-800 text-white border border-gray-700",
        duration: 3000,
      });
      setIsSubmitting(false);
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

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
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-white font-medium">
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
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            {
              icon: <Mail className="h-10 w-10 text-purple-500" />,
              title: "Email Us",
              details: "support@edunexus.com",
              description: "We usually respond within 24 hours",
            },
            {
              icon: <Phone className="h-10 w-10 text-blue-500" />,
              title: "Call Us",
              details: "+1 (555) 123-4567",
              description: "Mon-Fri, 9am to 5pm EST",
            },
            {
              icon: <MapPin className="h-10 w-10 text-green-500" />,
              title: "Visit Us",
              details: "123 Learning Lane",
              description: "Educational District, EX 12345",
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
              <p className="text-white mb-1">{item.details}</p>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  required
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us what you need..."
                  required
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 backdrop-blur-sm mb-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    question: "How do I sign up for a course?",
                    answer:
                      "Simply create an account, browse our course catalog, and click 'Enroll' on any course that interests you.",
                  },
                  {
                    question: "Can I get a refund if I'm not satisfied?",
                    answer:
                      "Yes, we offer a 30-day satisfaction guarantee. If you're not happy with a course, you can request a full refund within 30 days of purchase.",
                  },
                  {
                    question: "How long do I have access to courses?",
                    answer:
                      "Once enrolled, you have lifetime access to your purchased courses, including any future updates to the course content.",
                  },
                ].map((item, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4">
                    <h4 className="font-medium text-white mb-2">
                      {item.question}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-gray-700 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-gray-300 mb-4">
                Connect with other learners and instructors in our vibrant
                community.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Discord", "LinkedIn", "YouTube"].map(
                  (platform, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700 hover:text-purple-300"
                    >
                      {platform}
                    </Button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
