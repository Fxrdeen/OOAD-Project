import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb+srv://fardeenclan:LKHvp18Gd3aDwz82@cluster0.gvb6eln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "ooadproject";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  courseId: ObjectId;
  questions: Question[];
}

console.log("Started");

// Create client with options
const client = new MongoClient(uri, {
  // Add timeout to prevent hanging
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
});

async function insertQuiz(client: MongoClient, courseId: ObjectId) {
  const db = client.db(dbName);
  const quizCollection = db.collection("quiz");

  const javaBeginnerQuizzes = [
    {
      courseId: courseId,
      questions: [
        {
          question: "What does HTML stand for?",
          options: [
            "Hypertext Markup Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language",
            "Hypertext Machine Language",
          ],
          answer: "Hypertext Markup Language",
        },
        {
          question:
            "Which CSS property is used to change the text color of an element?",
          options: ["color", "text-color", "font-color", "text-style"],
          answer: "color",
        },
        {
          question: "Which HTML tag is used to create a hyperlink?",
          options: ["<a>", "<link>", "<href>", "<url>"],
          answer: "<a>",
        },
        {
          question:
            "Which CSS property is used to add space between the elements' border and its content?",
          options: ["padding", "margin", "spacing", "border-spacing"],
          answer: "padding",
        },
        {
          question:
            "Which HTML element is used to define the structure of an HTML document, including headings, paragraphs, or navigation?",
          options: ["<div>", "<span>", "<section>", "<navigator>"],
          answer: "<div>",
        },
      ],
    },
  ];

  await quizCollection.insertMany(javaBeginnerQuizzes);
}

try {
  console.log("Attempting to connect to MongoDB...");
  await client.connect();
  console.log("Connected to MongoDB");

  await insertQuiz(client, new ObjectId("67f3eea4ba65c137d7b6694f"));

  console.log("Database seeding completed successfully");
} catch (error) {
  console.error("Error seeding database:", error);
  // Print more detailed error information
  if (error instanceof Error) {
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
  }
} finally {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (closeError) {
    console.error("Error closing MongoDB connection:", closeError);
  }
}

// Run the script
