import { MongoClient, ObjectId } from "mongodb";

// Load environment variables
// Consider using dotenv package here

// MongoDB connection string - should be in .env file
const uri =
  "mongodb+srv://fardeenclan:LKHvp18Gd3aDwz82@cluster0.gvb6eln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "ooadproject";

// Define lesson type
interface Lesson {
  courseId: ObjectId;
  title: string;
  chapters: string[];
}

// Sample lessons data for Next.js concepts
const createLessons = (courseId: ObjectId): Lesson[] => [
  {
    courseId,
    title: "Introduction to Next.js",
    chapters: [
      "Next.js Fundamentals",
      "Pages and Routing",
      "Server-Side Rendering vs. Static Generation",
    ],
  },
  {
    courseId,
    title: "Data Fetching and State Management",
    chapters: [
      "API Routes",
      "SWR and React Query",
      "Working with External APIs",
    ],
  },
  {
    courseId,
    title: "Advanced Next.js Features",
    chapters: [
      "Middleware and Authentication",
      "Image Optimization",
      "Internationalization and Deployment",
    ],
  },
  {
    courseId,
    title: "Next.js Project",
    chapters: [
      "Project Planning and Architecture",
      "Implementation with Next.js",
      "Testing and Performance Optimization",
    ],
  },
];

// Function to insert lessons for a specific course
async function insertLessons(client: MongoClient, courseId: string) {
  const db = client.db(dbName);
  const lessonsCollection = db.collection("lessons");

  // Generate lessons for this course
  const lessons = createLessons(new ObjectId(courseId));

  // Insert lessons
  const result = await lessonsCollection.insertMany(lessons);
  console.log(
    `${result.insertedCount} lessons inserted for course ${courseId}`
  );
}

// Main function to run the script

console.log("Started");

// Create client with options
const client = new MongoClient(uri, {
  // Add timeout to prevent hanging
  connectTimeoutMS: 5000,
  socketTimeoutMS: 5000,
});

try {
  console.log("Attempting to connect to MongoDB...");
  await client.connect();
  console.log("Connected to MongoDB");

  // Get all courses from the database
  const db = client.db(dbName);
  const coursesCollection = db.collection("courses");
  const courses = await coursesCollection.find({}).toArray();

  if (courses.length === 0) {
    console.log("No courses found. Please add courses first.");
    process.exit(1);
  }

  // Insert lessons for each course
  // for (const course of courses) {
  //   await insertLessons(client, course._id.toString());
  // }

  await insertLessons(client, "67e68be42f59df321f216c18");

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
