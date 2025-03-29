import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  skills: [String],
  description: String,
  salary: String,
  type: String, // Full-time, Part-time, Remote, etc.
});

const Job = mongoose.model("Job", jobSchema);

const jobListings = [
  {
    title: "Software Engineer",
    company: "Google",
    location: "California, USA",
    skills: ["javascript", "react", "node.js"],
    description: "Develop scalable web applications.",
    salary: "$120,000 - $150,000",
    type: "Full-time",
  },
  {
    title: "Backend Developer",
    company: "Amazon",
    location: "Seattle, USA",
    skills: ["java", "spring boot", "aws"],
    description: "Build and maintain backend services.",
    salary: "$110,000 - $140,000",
    type: "Full-time",
  },
  {
    title: "Cloud Engineer",
    company: "Microsoft",
    location: "Redmond, USA",
    skills: ["aws", "azure", "terraform"],
    description: "Manage and optimize cloud infrastructure.",
    salary: "$130,000 - $160,000",
    type: "Full-time",
  },
  {
    title: "Data Scientist",
    company: "Facebook",
    location: "Menlo Park, USA",
    skills: ["python", "machine learning", "sql"],
    description: "Analyze large datasets to extract insights.",
    salary: "$140,000 - $170,000",
    type: "Full-time",
  },
  {
    title: "Full Stack Developer",
    company: "Netflix",
    location: "Los Gatos, USA",
    skills: ["react", "node.js", "mongodb"],
    description: "Develop and maintain full-stack applications.",
    salary: "$125,000 - $155,000",
    type: "Full-time",
  },
  {
    title: "DevOps Engineer",
    company: "Spotify",
    location: "New York, USA",
    skills: ["docker", "kubernetes", "ci/cd"],
    description: "Automate deployment pipelines.",
    salary: "$135,000 - $165,000",
    type: "Full-time",
  },
  {
    title: "Cybersecurity Analyst",
    company: "IBM",
    location: "Texas, USA",
    skills: ["cybersecurity", "ethical hacking", "siem"],
    description: "Monitor and prevent security threats.",
    salary: "$110,000 - $140,000",
    type: "Full-time",
  },
  {
    title: "AI Engineer",
    company: "Tesla",
    location: "California, USA",
    skills: ["deep learning", "nlp", "tensorflow"],
    description: "Build AI models for autonomous driving.",
    salary: "$150,000 - $180,000",
    type: "Full-time",
  },
  {
    title: "Mobile App Developer",
    company: "Uber",
    location: "San Francisco, USA",
    skills: ["flutter", "react native", "swift"],
    description: "Develop and optimize mobile applications.",
    salary: "$120,000 - $145,000",
    type: "Full-time",
  },
  {
    title: "Game Developer",
    company: "Epic Games",
    location: "North Carolina, USA",
    skills: ["c++", "unreal engine", "game development"],
    description: "Create immersive gaming experiences.",
    salary: "$115,000 - $140,000",
    type: "Full-time",
  },
  {
    title: "Machine Learning Engineer",
    company: "Apple",
    location: "Cupertino, USA",
    skills: ["python", "scikit-learn", "ai"],
    description: "Develop ML models for Siri.",
    salary: "$145,000 - $175,000",
    type: "Full-time",
  },
  {
    title: "Blockchain Developer",
    company: "Coinbase",
    location: "Remote",
    skills: ["blockchain", "solidity", "ethereum"],
    description: "Develop decentralized applications.",
    salary: "$135,000 - $165,000",
    type: "Remote",
  },
  {
    title: "UI/UX Designer",
    company: "Adobe",
    location: "San Jose, USA",
    skills: ["figma", "adobe xd", "ui design"],
    description: "Design user-friendly interfaces.",
    salary: "$100,000 - $130,000",
    type: "Full-time",
  },
  {
    title: "Site Reliability Engineer",
    company: "Twitter",
    location: "San Francisco, USA",
    skills: ["kubernetes", "prometheus", "sre"],
    description: "Ensure system reliability and scalability.",
    salary: "$140,000 - $170,000",
    type: "Full-time",
  },
  {
    title: "Embedded Systems Engineer",
    company: "Intel",
    location: "Oregon, USA",
    skills: ["c", "microcontrollers", "embedded systems"],
    description: "Develop firmware for microcontrollers.",
    salary: "$125,000 - $155,000",
    type: "Full-time",
  },
  {
    title: "Network Engineer",
    company: "Cisco",
    location: "California, USA",
    skills: ["networking", "ccna", "firewall"],
    description: "Design and manage network infrastructure.",
    salary: "$120,000 - $145,000",
    type: "Full-time",
  },
  {
    title: "AI Research Scientist",
    company: "DeepMind",
    location: "London, UK",
    skills: ["ai", "neural networks", "research"],
    description: "Conduct AI research for future applications.",
    salary: "$170,000 - $200,000",
    type: "Full-time",
  },
  {
    title: "Frontend Developer",
    company: "Shopify",
    location: "Remote",
    skills: ["react", "javascript", "css"],
    description: "Build interactive and responsive web pages.",
    salary: "$100,000 - $130,000",
    type: "Remote",
  },
  {
    title: "Database Administrator",
    company: "Oracle",
    location: "Austin, USA",
    skills: ["sql", "postgresql", "dbms"],
    description: "Manage and optimize databases.",
    salary: "$110,000 - $140,000",
    type: "Full-time",
  },
];

// Insert data into MongoDB
async function seedDB() {
  await Job.insertMany(jobListings);
  console.log("Jobs inserted successfully!");
  mongoose.connection.close();
}

// Run the function
seedDB().catch((error) => {
  console.error("Error inserting jobs:", error);
  mongoose.connection.close();
});
