"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  courseId: {
    timestamp: number;
    date: string;
  };
  questions: Question[];
  id: string;
}

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

const QuizPage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizRes = await fetch(`http://localhost:8090/quiz/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!quizRes.ok) {
          throw new Error("Failed to fetch quiz");
        }

        const quizData = await quizRes.json();
        setQuiz(quizData);

        // Also fetch course name
        const courseRes = await fetch(
          `http://localhost:8090/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (courseRes.ok) {
          const courseData = await courseRes.json();
          setCourseName(courseData.title);
        }

        setLoading(false);
        setTimerActive(true);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to load quiz", { style: toastStyle });
        setLoading(false);
      }
    };

    fetchQuizData();

    return () => {
      setTimerActive(false);
    };
  }, [courseId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeRemaining > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleQuizComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeRemaining, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    // Store user's answer
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = option;
    setUserAnswers(newUserAnswers);

    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (currentQuestion && option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    setQuizCompleted(true);
    setTimerActive(false);

    const finalScore = score;
    const totalQuestions = quiz?.questions.length || 0;
    const percentage = Math.round((finalScore / totalQuestions) * 100);

    // Prepare answers in the format expected by the backend
    const answersForSubmission = quiz?.questions.map((question, index) => {
      return {
        question: question.question,
        options: question.options,
        answer: question.answer,
        userAnswer: userAnswers[index] || "", // Get the user's answer for this question
      };
    });

    // Create quiz response object
    const quizResponse = {
      userId:
        localStorage.getItem("userId") ||
        JSON.parse(localStorage.getItem("userData") || "{}").id,
      courseId: courseId,
      answers: answersForSubmission,
      score: finalScore,
    };

    try {
      // Submit quiz response to backend
      const response = await fetch("http://localhost:8090/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(quizResponse),
      });

      if (!response.ok) {
        throw new Error("Failed to submit quiz results");
      }

      // Show success message
      let message = "";
      if (percentage >= 80) {
        message = "Excellent! You've mastered this topic.";
      } else if (percentage >= 60) {
        message = "Good job! You have a solid understanding.";
      } else {
        message = "Keep practicing to improve your knowledge.";
      }

      toast.success(
        `Quiz completed! Your score: ${finalScore}/${totalQuestions}`,
        {
          style: toastStyle,
          description: message,
          duration: 5000,
        }
      );
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to save your quiz results", { style: toastStyle });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
        <p className="text-gray-400 mb-6">
          This course might not have a quiz available.
        </p>
        <Link href={`/enrolled/${courseId}`}>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Course
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-60 -right-20 w-80 h-80 bg-blue-700/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center mb-8">
          <Link href={`/enrolled/${courseId}`}>
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white p-0 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              {courseName} Quiz
            </h1>
            <p className="text-gray-400 mt-1">
              Test your knowledge of {courseName}
            </p>
          </div>
        </div>

        {!quizCompleted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800/40 border-gray-700 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <span className="text-xl font-medium mr-2 text-white">
                    Question {currentQuestionIndex + 1}/{quiz.questions.length}
                  </span>
                  <Progress
                    value={(currentQuestionIndex / quiz.questions.length) * 100}
                    className="w-32 bg-gray-700"
                  />
                </div>
                <div className="flex items-center text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  <span
                    className={`${
                      timeRemaining < 60 ? "text-red-400" : "text-gray-300"
                    }`}
                  >
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-6 text-white">
                {quiz.questions[currentQuestionIndex].question}
              </h2>

              <div className="space-y-3">
                {quiz.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                      whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                    >
                      <button
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center ${
                          selectedOption === option
                            ? isAnswered &&
                              option ===
                                quiz.questions[currentQuestionIndex].answer
                              ? "bg-green-900/30 border-green-600 text-white"
                              : isAnswered
                              ? "bg-red-900/30 border-red-600 text-white"
                              : "bg-purple-900/40 border-purple-600 text-white"
                            : isAnswered &&
                              option ===
                                quiz.questions[currentQuestionIndex].answer
                            ? "bg-green-900/30 border-green-600 text-white"
                            : "bg-gray-800/70 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                        }`}
                        disabled={isAnswered}
                      >
                        <span>{option}</span>
                        {isAnswered &&
                          (option ===
                          quiz.questions[currentQuestionIndex].answer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : selectedOption === option ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : null)}
                      </button>
                    </motion.div>
                  )
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                  className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all ${
                    isAnswered ? "opacity-100" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    "Complete Quiz"
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/40 border-gray-700 p-8 rounded-xl text-center backdrop-blur-sm"
          >
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-purple-600/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-purple-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-gray-400 mb-6">
              You scored {score} out of {quiz.questions.length}
            </p>

            <div className="w-full max-w-xs mx-auto mb-8">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-400">
                      Score
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-400">
                      {Math.round((score / quiz.questions.length) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded-full bg-gray-700">
                  <div
                    style={{
                      width: `${(score / quiz.questions.length) * 100}%`,
                    }}
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href={`/enrolled/${courseId}`}>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 text-purple-400 hover:bg-gray-700 hover:text-purple-300 hover:border-purple-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Course
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setScore(0);
                  setQuizCompleted(false);
                  setTimeRemaining(300);
                  setTimerActive(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Retry Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
