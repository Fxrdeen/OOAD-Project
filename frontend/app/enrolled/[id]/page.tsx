"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Course, Lesson } from "@/types";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  PlayCircle,
  Trophy,
  RefreshCw,
  Info as InfoIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface LessonProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt: string;
}

const EnrolledCoursePage = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<
    Record<string, boolean>
  >({});
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);
  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(
    new Set()
  );
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [quizResponse, setQuizResponse] = useState<any>(null);

  // Function to check if a lesson is completed
  const isLessonCompleted = (lessonId: string) => {
    return completedLessons[lessonId] === true;
  };

  // Function to fetch lesson progress from the backend
  const fetchLessonProgress = async () => {
    if (!user || !id) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const progressResponse = await fetch(
        `http://localhost:8090/lesson-progress/${user.id}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (progressResponse.ok) {
        const progressData: LessonProgress[] = await progressResponse.json();
        // Create a map of lessonId to completion status
        const completionMap: Record<string, boolean> = {};

        for (const progress of progressData) {
          completionMap[progress.lessonId] = progress.completed;
        }

        setCompletedLessons(completionMap);
      }
    } catch (error) {
      console.error("Error fetching lesson progress:", error);
    }
  };

  // Add this function to fetch quiz response
  const fetchQuizResponse = async () => {
    if (!user || !id) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      // Fix 1: Ensure user.id is accessed correctly
      const userId = user.id;

      // Fix 2: Make sure correct endpoint syntax
      const response = await fetch(
        `http://localhost:8090/quiz/response/${id}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fix 3: Check not just if response is ok but also if it has data
      if (response.ok) {
        const data = await response.json();
        // Only set quiz response if we got actual data
        if (data && Object.keys(data).length > 0) {
          setQuizResponse(data);
          console.log("Quiz response fetched successfully:", data);
        } else {
          console.log("Quiz response is empty");
          setQuizResponse(null);
        }
      } else {
        // Fix 4: Clear quiz response if request fails
        console.log("No quiz response found");
        setQuizResponse(null);
      }
    } catch (error) {
      console.error("Error fetching quiz response:", error);
      // Fix 5: Clear quiz response on error
      setQuizResponse(null);
    }
  };

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("userData");

        if (!token || !userData) {
          toast.error("Please login to continue", {
            className: "bg-gray-800 text-white border border-gray-700",
            duration: 3000,
          });
          return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Fetch course details
        const courseResponse = await fetch(
          `http://localhost:8090/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData);

          // Fetch lessons
          const lessonsResponse = await fetch(
            `http://localhost:8090/lessons/course/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (lessonsResponse.ok) {
            const lessonsData = await lessonsResponse.json();
            const sortedLessons = lessonsData.sort(
              (a: Lesson, b: Lesson) => a.order - b.order
            );
            setLessons(sortedLessons);
            // Set first lesson and chapter as selected by default
            if (sortedLessons.length > 0) {
              setSelectedLesson(sortedLessons[0]);
              if (sortedLessons[0].chapters.length > 0) {
                setSelectedChapter(sortedLessons[0].chapters[0]);
              }
              setExpandedLessons([sortedLessons[0].id]);
            }

            // Fetch lesson progress
            await fetchLessonProgress();
            await fetchQuizResponse();
          }
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error);
        toast.error("Failed to fetch course data", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndLessons();
  }, [id]);

  // Fetch lesson progress when user is set
  useEffect(() => {
    if (user) {
      fetchLessonProgress();
    }
  }, [user, id]);

  // Add this useEffect to fetch quiz response when user changes
  useEffect(() => {
    if (user && id) {
      fetchQuizResponse();
    }
  }, [user, id]);

  const handleChapterClick = (lesson: Lesson, chapter: string) => {
    setSelectedLesson(lesson);
    setSelectedChapter(chapter);
  };

  const handleLessonExpand = (lessonId: string) => {
    setExpandedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const handleChapterCheck = (lessonId: string, chapter: string) => {
    const chapterId = `${lessonId}-${chapter}`;
    setCheckedChapters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId);
      } else {
        newSet.add(chapterId);
      }
      return newSet;
    });
  };

  const areAllChaptersChecked = (lesson: Lesson) => {
    return lesson.chapters.every((chapter) =>
      checkedChapters.has(`${lesson.id}-${chapter}`)
    );
  };

  const handleCompleteLesson = async () => {
    if (!selectedLesson || !areAllChaptersChecked(selectedLesson) || !user)
      return;

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Please login to continue", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
        return;
      }

      const response = await fetch(
        `http://localhost:8090/lesson-progress/complete/${user.id}/${id}/${selectedLesson.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update local state
        setCompletedLessons((prev) => ({
          ...prev,
          [selectedLesson.id]: true,
        }));

        // Clear checked chapters for this lesson
        setCheckedChapters((prev) => {
          const newSet = new Set(prev);
          selectedLesson.chapters.forEach((chapter) => {
            newSet.delete(`${selectedLesson.id}-${chapter}`);
          });
          return newSet;
        });

        toast.success("Lesson completed successfully!", {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });

        // Refresh lesson progress to ensure UI is updated
        await fetchLessonProgress();
      } else {
        const errorData = await response.text();
        toast.error(`Failed to complete lesson: ${errorData}`, {
          className: "bg-gray-800 text-white border border-gray-700",
          duration: 3000,
        });
      }

      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Failed to complete lesson:", error);
      toast.error("Failed to complete lesson", {
        className: "bg-gray-800 text-white border border-gray-700",
        duration: 3000,
      });
    }
  };

  // Add this function to check if all lessons are completed
  const areAllLessonsCompleted = () => {
    if (lessons.length === 0) return false;

    return lessons.every((lesson) => isLessonCompleted(lesson.id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Lessons Sidebar */}
      <div className="w-1/4 bg-gray-900 h-full overflow-y-auto border-r border-gray-800">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Course Content</h2>
          <Accordion type="multiple" value={expandedLessons}>
            {lessons.map((lesson, lessonIndex) => (
              <AccordionItem
                key={lesson.id}
                value={lesson.id}
                className="border-gray-800"
              >
                <AccordionTrigger
                  onClick={() => handleLessonExpand(lesson.id)}
                  className="hover:no-underline"
                >
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-sm bg-gray-800 px-2 py-1 rounded">
                      Lesson {lessonIndex + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      {lesson.title}
                      {isLessonCompleted(lesson.id) && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 pl-4">
                    {lesson.chapters.map((chapter, chapterIndex) => (
                      <motion.div
                        key={`${lesson.id}-${chapter}`}
                        className={`p-3 rounded-lg cursor-pointer transition-all ${
                          selectedLesson?.id === lesson.id &&
                          selectedChapter === chapter
                            ? "bg-purple-600/20 border border-purple-500/50"
                            : "bg-gray-800/50 hover:bg-gray-800 border border-gray-700"
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex items-center gap-3 flex-1"
                            onClick={() => handleChapterClick(lesson, chapter)}
                          >
                            <PlayCircle
                              size={16}
                              className={`${
                                selectedLesson?.id === lesson.id &&
                                selectedChapter === chapter
                                  ? "text-purple-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="text-white text-sm">
                              {chapter}
                            </span>
                          </div>
                          <Checkbox
                            checked={checkedChapters.has(
                              `${lesson.id}-${chapter}`
                            )}
                            onCheckedChange={() =>
                              handleChapterCheck(lesson.id, chapter)
                            }
                            disabled={isLessonCompleted(lesson.id)}
                            className="border-gray-600"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto">
        {selectedLesson && selectedChapter ? (
          <div className="p-8">
            {/* Video Placeholder */}
            <div className="w-full h-[50vh] bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
              <PlayCircle size={64} className="text-gray-600" />
            </div>

            {/* Content */}
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {selectedChapter}
                  </h1>
                  <p className="text-gray-400">{selectedLesson.title}</p>
                </div>
                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600"
                  disabled={
                    isLessonCompleted(selectedLesson.id) ||
                    !areAllChaptersChecked(selectedLesson)
                  }
                >
                  {isLessonCompleted(selectedLesson.id)
                    ? "Lesson Completed"
                    : "Complete Lesson"}
                </Button>
              </div>
            </div>

            {/* Quiz Section - Only show when all lessons are completed */}
            {areAllLessonsCompleted() && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mt-12 pt-8 border-t border-gray-700"
              >
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-900/30 rounded-lg">
                      {quizResponse ? (
                        <Trophy className="h-6 w-6 text-blue-500" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-500"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4" />
                          <path d="M12 8h.01" />
                        </svg>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      Course Quiz
                    </h2>
                  </div>

                  {quizResponse ? (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1">
                          <p className="text-gray-300 mb-2">
                            You have already completed this quiz
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">
                              Score: {quizResponse.score}/
                              {quizResponse.answers.length}
                            </span>
                            <span className="text-lg text-gray-400">
                              (
                              {Math.round(
                                (quizResponse.score /
                                  quizResponse.answers.length) *
                                  100
                              )}
                              %)
                            </span>
                          </div>
                        </div>
                        <Link href={`/enrolled/${id}/quiz`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg flex items-center gap-2"
                          >
                            <RefreshCw className="h-4 w-4" />
                            Retake Quiz
                          </motion.button>
                        </Link>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center gap-2 text-gray-300">
                          <InfoIcon className="h-4 w-4" />
                          <span>
                            You can retake the quiz to improve your score
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300 mb-6">
                        Congratulations on completing all lessons! Test your
                        knowledge and earn your certificate by taking the final
                        quiz.
                      </p>

                      <div className="flex justify-center">
                        <Link href={`/enrolled/${id}/quiz`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg flex items-center gap-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                              <path d="m9 9.5 1.5 2L15 7" />
                            </svg>
                            Take Quiz
                          </motion.button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select a chapter to begin</p>
          </div>
        )}
      </div>

      {/* Completion Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Complete Lesson
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to mark this lesson as complete? You have
              completed all chapters.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleCompleteLesson}
            >
              Complete Lesson
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnrolledCoursePage;
