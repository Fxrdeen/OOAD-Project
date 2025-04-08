"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Book,
  BookOpen,
  Layers,
  Check,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

// Toast styles
const toastStyle = {
  backgroundColor: "#1e1e2f",
  color: "#f9fafb",
  border: "1px solid #374151",
  borderRadius: "0.75rem",
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
  fontSize: "0.95rem",
  padding: "0.75rem 1rem",
};

// Step 1: Course Details Form Schema
const courseFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  difficulty: z
    .string()
    .min(1, { message: "Please select a difficulty level" }),
  hours: z.coerce
    .number()
    .positive({ message: "Hours must be a positive number" }),
  price: z.string().min(1, { message: "Please enter a price" }),
});

// Step 2: Lessons Form Schema
const lessonsFormSchema = z.object({
  lessons: z
    .array(
      z.object({
        title: z
          .string()
          .min(5, { message: "Lesson title must be at least 5 characters" }),
        chapters: z
          .array(
            z.string().min(3, {
              message: "Chapter title must be at least 3 characters",
            })
          )
          .min(1, { message: "At least one chapter is required" }),
        order: z.number(),
      })
    )
    .min(1, { message: "At least one lesson is required" }),
});

// Add this schema after the lessonsFormSchema
const quizFormSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .min(5, { message: "Question must be at least 5 characters" }),
        options: z
          .array(z.string().min(1, { message: "Option cannot be empty" }))
          .length(4, { message: "Exactly 4 options are required" }),
        answer: z
          .string()
          .min(1, { message: "Please select the correct answer" }),
      })
    )
    .min(1, { message: "At least one question is required" }),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;
type LessonsFormValues = z.infer<typeof lessonsFormSchema>;
type QuizFormValues = z.infer<typeof quizFormSchema>;

const CreateCoursePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [courseId, setCourseId] = useState<string>("");

  // Initialize course form
  const courseForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Beginner",
      hours: 10,
      price: "$10",
    },
  });

  // Initialize lessons form with field array
  const lessonsForm = useForm<LessonsFormValues>({
    resolver: zodResolver(lessonsFormSchema),
    defaultValues: {
      lessons: [
        {
          title: "",
          chapters: [""],
          order: 1,
        },
      ],
    },
  });

  const {
    fields: lessonFields,
    append: appendLesson,
    remove: removeLesson,
  } = useFieldArray({
    control: lessonsForm.control,
    name: "lessons",
  });

  // Initialize quiz form
  const quizForm = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    },
  });

  // Add these field arrays for quiz questions
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: quizForm.control,
    name: "questions",
  });

  // Function to handle adding chapters to a specific lesson
  const addChapter = (lessonIndex: number) => {
    const lessons = lessonsForm.getValues().lessons;
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].chapters.push("");
    lessonsForm.setValue("lessons", updatedLessons);
  };

  // Function to handle removing chapters from a specific lesson
  const removeChapter = (lessonIndex: number, chapterIndex: number) => {
    const lessons = lessonsForm.getValues().lessons;
    const updatedLessons = [...lessons];

    if (updatedLessons[lessonIndex].chapters.length > 1) {
      updatedLessons[lessonIndex].chapters.splice(chapterIndex, 1);
      lessonsForm.setValue("lessons", updatedLessons);
    } else {
      toast.error("Each lesson must have at least one chapter", {
        style: toastStyle,
      });
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
  };

  // Check authentication status on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (!token || !userData) {
        router.push("/login");
        return;
      }

      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.role !== "INSTRUCTOR") {
        toast.error("Only instructors can create courses", {
          style: toastStyle,
        });
        router.push("/");
        return;
      }

      setIsAuthenticated(true);
      setUser(parsedUserData);
    }
  }, [router]);

  // Handle course form submission (step 1)
  const onCourseSubmit = (data: CourseFormValues) => {
    setCourseData(data);
    setCurrentStep(2);

    // Pre-populate order field for lessons
    const lessons = lessonsForm.getValues().lessons;
    const updatedLessons = lessons.map((lesson, index) => ({
      ...lesson,
      order: index + 1,
    }));
    lessonsForm.setValue("lessons", updatedLessons);
  };

  // Handle lessons form submission (step 2)
  const onLessonsSubmit = async (data: LessonsFormValues) => {
    if (!courseData || !user) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      const courseResponse = await fetch(
        "http://localhost:8090/courses/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: courseData.title,
            description: courseData.description,
            difficulty: courseData.difficulty,
            hours: courseData.hours,
            price: courseData.price,
            instructorId: user.id,
            lessons: data.lessons.length,
            rating: 5,
          }),
        }
      );

      const newCourseId = await courseResponse.text();
      setCourseId(newCourseId);

      // 2. Create lessons for the course
      const lessonPromises = data.lessons.map(async (lesson) => {
        return await fetch("http://localhost:8090/lessons/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: lesson.title,
            chapters: lesson.chapters,
            courseId: newCourseId,
            order: lesson.order,
          }),
        });
      });

      await Promise.all(lessonPromises);

      toast.success("Course created successfully!", {
        style: toastStyle,
      });

      // Instead of redirecting, move to quiz step
      setCurrentStep(3);
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course. Please try again.", {
        style: toastStyle,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add the quiz submission handler
  const onQuizSubmit = async (data: QuizFormValues) => {
    if (!courseId || !user) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      // Format the data to use the actual answer text instead of the index
      const formattedQuestions = data.questions.map((q) => {
        const answerIndex = parseInt(q.answer);
        return {
          question: q.question,
          options: q.options,
          answer: q.options[answerIndex],
        };
      });

      const response = await fetch("http://localhost:8090/quiz/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: courseId,
          questions: formattedQuestions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }

      toast.success("Course and quiz created successfully!", {
        style: toastStyle,
      });

      router.push("/instructor");
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz. Please try again.", {
        style: toastStyle,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        handleLogout={handleLogout}
      />

      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
            <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
            >
              Create New Course
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-2 mb-6"
            >
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 1 ? "bg-purple-600" : "bg-green-600"
                }`}
              >
                1
              </div>
              <div className="h-0.5 bg-gray-700 flex-grow self-center"></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 2
                    ? "bg-purple-600"
                    : currentStep > 2
                    ? "bg-green-600"
                    : "bg-gray-700"
                }`}
              >
                2
              </div>
              <div className="h-0.5 bg-gray-700 flex-grow self-center"></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  currentStep === 3 ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                3
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-300"
            >
              {currentStep === 1
                ? "Enter the basic details of your course"
                : currentStep === 2
                ? "Add lessons and chapters to your course"
                : "Create the course quiz"}
            </motion.p>
          </div>
        </motion.div>

        {/* Step 1: Course Details Form */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Book className="text-purple-500" />
              <h2 className="text-xl font-bold">Course Information</h2>
            </div>

            <Form {...courseForm}>
              <form
                onSubmit={courseForm.handleSubmit(onCourseSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={courseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Course Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Java for Beginners"
                          {...field}
                          className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={courseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Course Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what students will learn..."
                          {...field}
                          className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={courseForm.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">
                          Difficulty Level
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={courseForm.control}
                    name="hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">
                          Duration (hours)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={courseForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200">Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$10"
                            {...field}
                            className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-6"
                    >
                      Continue to Lessons
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </form>
            </Form>
          </motion.div>
        )}

        {/* Step 2: Lessons Form */}
        {currentStep === 2 && courseData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Course summary */}
            <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{courseData.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                    {courseData.description}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData.hours} hours
                    </span>
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData.price}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="bg-gray-800 text-purple-400 border-gray-700 hover:bg-gray-700 hover:text-purple-300 hover:border-purple-500"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Edit Details
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-purple-500" />
                <h2 className="text-xl font-bold">Lessons & Chapters</h2>
              </div>

              <Form {...lessonsForm}>
                <form
                  onSubmit={lessonsForm.handleSubmit(onLessonsSubmit)}
                  className="space-y-8"
                >
                  {lessonFields.map((lessonField, lessonIndex) => (
                    <div
                      key={lessonField.id}
                      className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <Layers className="h-4 w-4 text-blue-400" />
                          Lesson {lessonIndex + 1}
                        </h3>

                        {lessonFields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLesson(lessonIndex)}
                            className="h-8 px-2 bg-red-900/30 hover:bg-red-800 text-red-300 border-red-800/50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove Lesson
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {/* Lesson title */}
                        <FormField
                          control={lessonsForm.control}
                          name={`lessons.${lessonIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Lesson Title
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Introduction to Java"
                                  {...field}
                                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        {/* Chapters */}
                        <div>
                          <FormLabel className="text-gray-200 block mb-2">
                            Chapters
                          </FormLabel>
                          <div className="space-y-3">
                            {lessonsForm
                              .getValues()
                              .lessons[lessonIndex].chapters.map(
                                (_, chapterIndex) => (
                                  <div
                                    key={chapterIndex}
                                    className="flex gap-2"
                                  >
                                    <FormField
                                      control={lessonsForm.control}
                                      name={`lessons.${lessonIndex}.chapters.${chapterIndex}`}
                                      render={({ field }) => (
                                        <FormItem className="flex-grow">
                                          <FormControl>
                                            <Input
                                              placeholder={`Chapter ${
                                                chapterIndex + 1
                                              }`}
                                              {...field}
                                              className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                                            />
                                          </FormControl>
                                          <FormMessage className="text-red-400" />
                                        </FormItem>
                                      )}
                                    />

                                    {lessonsForm.getValues().lessons[
                                      lessonIndex
                                    ].chapters.length > 1 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                          removeChapter(
                                            lessonIndex,
                                            chapterIndex
                                          )
                                        }
                                        className="h-10 w-10 rounded-full bg-gray-800 border-gray-700 text-red-400 hover:bg-red-900/30 hover:border-red-500"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                )
                              )}
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addChapter(lessonIndex)}
                          className="mt-2 bg-gray-800 border-gray-700 text-purple-400 hover:bg-gray-700/80 hover:text-purple-300 hover:border-purple-500"
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add Chapter
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendLesson({
                        title: "",
                        chapters: [""],
                        order: lessonFields.length + 1,
                      })
                    }
                    className="w-full py-6 border-dashed border-gray-700 text-purple-400 hover:text-purple-300 hover:border-purple-500 bg-gray-800/50 hover:bg-gray-800"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add New Lesson
                  </Button>

                  <div className="flex gap-4 justify-end pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      className="px-6 py-5 bg-gray-800 border-gray-700 text-purple-400 hover:bg-gray-700 hover:text-purple-300 hover:border-purple-500"
                      disabled={isSubmitting}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating Course..." : "Create Course"}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        )}

        {/* Step 3: Quiz Form */}
        {currentStep === 3 && courseId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Course summary - reuse from step 2 */}
            <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{courseData?.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                    {courseData?.description}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData?.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData?.hours} hours
                    </span>
                    <span className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">
                      {courseData?.price}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="bg-gray-800 text-purple-400 border-gray-700 hover:bg-gray-700 hover:text-purple-300 hover:border-purple-500"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Edit Details
                </Button>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-xl border border-gray-700 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-purple-500" />
                <h2 className="text-xl font-bold">Course Quiz</h2>
              </div>

              <Form {...quizForm}>
                <form
                  onSubmit={quizForm.handleSubmit(onQuizSubmit)}
                  className="space-y-8"
                >
                  {questionFields.map((field, questionIndex) => (
                    <div
                      key={field.id}
                      className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-blue-400" />
                          Question {questionIndex + 1}
                        </h3>

                        {questionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeQuestion(questionIndex)}
                            className="h-8 px-2 bg-red-900/30 hover:bg-red-800 text-red-300 border-red-800/50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove Question
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        {/* Question text */}
                        <FormField
                          control={quizForm.control}
                          name={`questions.${questionIndex}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Question
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your question"
                                  {...field}
                                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        {/* Options */}
                        <div className="space-y-3">
                          <FormLabel className="text-gray-200">
                            Options
                          </FormLabel>
                          {[0, 1, 2, 3].map((optionIndex) => (
                            <FormField
                              key={optionIndex}
                              control={quizForm.control}
                              name={`questions.${questionIndex}.options.${optionIndex}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex gap-2 items-center">
                                      <Input
                                        placeholder={`Option ${
                                          optionIndex + 1
                                        }`}
                                        {...field}
                                        className="bg-gray-700/50 border-gray-600 focus:border-purple-500 text-white"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-red-400" />
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>

                        {/* Correct Answer */}
                        <FormField
                          control={quizForm.control}
                          name={`questions.${questionIndex}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Correct Answer
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="space-y-2"
                                >
                                  {[0, 1, 2, 3].map((idx) => {
                                    const optionText =
                                      quizForm.getValues().questions[
                                        questionIndex
                                      ].options[idx] || "";
                                    return (
                                      <div
                                        key={idx}
                                        className="flex items-center space-x-2"
                                      >
                                        <RadioGroupItem
                                          value={String(idx)}
                                          id={`answer-${questionIndex}-${idx}`}
                                          className="border-gray-600 text-purple-500"
                                          disabled={!optionText.trim()}
                                        />
                                        <label
                                          htmlFor={`answer-${questionIndex}-${idx}`}
                                          className={`text-sm font-medium leading-none ${
                                            optionText.trim()
                                              ? "text-gray-300"
                                              : "text-gray-500"
                                          } peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                                        >
                                          {optionText ||
                                            `Option ${idx + 1} (empty)`}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendQuestion({
                        question: "",
                        options: ["", "", "", ""],
                        answer: "",
                      })
                    }
                    className="w-full py-6 border-dashed border-gray-700 text-purple-400 hover:text-purple-300 hover:border-purple-500 bg-gray-800/50 hover:bg-gray-800"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Add New Question
                  </Button>

                  <div className="flex gap-4 justify-end pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-5 bg-gray-800 border-gray-700 text-purple-400 hover:bg-gray-700 hover:text-purple-300 hover:border-purple-500"
                      disabled={isSubmitting}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back to Lessons
                    </Button>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating Quiz..." : "Complete Course"}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateCoursePage;
