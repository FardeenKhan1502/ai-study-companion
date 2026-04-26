import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { createRequire } from 'module';
import { GoogleGenAI } from '@google/genai';

const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse');
const pdfParse = pdfParseModule.default || pdfParseModule;

dotenv.config();

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Setup multer for PDF uploads (in-memory storage for simplicity)
const upload = multer({ storage: multer.memoryStorage() });

// Mock Database (since we don't have MongoDB setup yet)
const db = {
  syllabi: {},
  progress: {}
};

// --- ROUTES ---

// 1. Upload & Parse Syllabus
app.post('/api/syllabus/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the PDF buffer
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    
    // Create a dynamic but simulated roadmap from the text since we don't have an OpenAI key.
    // We'll extract a few sentences to make it look personalized.
    const preview = text.substring(0, 200).replace(/\n/g, ' ');
    
    const mockId = Date.now().toString();
    const mockRoadmap = [
      {
        id: 1,
        chapter: `Chapter 1: Introduction to your Material`,
        status: 'in-progress',
        topics: [
          { id: 101, title: 'Overview & Fundamentals', status: 'in-progress' },
          { id: 102, title: preview.substring(0, 40) + '...', status: 'pending' },
        ]
      },
      {
        id: 2,
        chapter: 'Chapter 2: Core Concepts',
        status: 'pending',
        topics: [
          { id: 201, title: 'Deep Dive into ' + (req.file.originalname.split('.')[0] || 'Topic'), status: 'pending' },
          { id: 202, title: 'Advanced Applications', status: 'pending' },
          { id: 203, title: 'Case Studies', status: 'pending' },
        ]
      }
    ];

    db.syllabi[mockId] = mockRoadmap;

    res.json({ message: 'Syllabus processed successfully', id: mockId, roadmap: mockRoadmap });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process syllabus' });
  }
});

// 2. Get Syllabus Roadmap
app.get('/api/syllabus/:id', (req, res) => {
  const roadmap = db.syllabi[req.params.id];
  if (!roadmap) {
    return res.status(404).json({ error: 'Syllabus not found' });
  }
  res.json({ roadmap });
});

// 3. Get Video Recommendations
app.get('/api/videos/recommend', async (req, res) => {
  const { query } = req.query;
  
  // In a real app, call YouTube Data API here.
  // Mock Response:
  const mockVideos = [
    {
      id: "vid1",
      title: `Understanding ${query} (Updated)`,
      channel: "Amoeba Sisters",
      views: "2.5M",
      duration: "6:31",
      thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400&h=225",
      matchScore: "98%"
    },
    {
      id: "vid2",
      title: `${query} Explained Simply`,
      channel: "Khan Academy",
      views: "4.1M",
      duration: "5:24",
      thumbnail: "https://images.unsplash.com/photo-1614914135224-9ea6f91f3e7b?auto=format&fit=crop&q=80&w=400&h=225",
      matchScore: "95%"
    }
  ];

  res.json({ videos: mockVideos });
});

// 4. AI Chatbot
app.post('/api/chat', async (req, res) => {
  const { message, syllabusId } = req.body;
  
  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an AI Study Companion. Answer the student's question concisely and accurately: "${message}"`
      });
      return res.json({ reply: response.text });
    }
    
    // Mock Response if no API key:
    res.json({ reply: `[Mock Mode - No API Key Found]\nHere is a simulated response to your question: "${message}". To get real AI answers, add GEMINI_API_KEY to your backend .env file.` });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "Sorry, I encountered an error while processing your request." });
  }
});

// 5. Exam Mode
app.post('/api/exam-mode', (req, res) => {
  const { days, syllabusId } = req.body;
  
  // In a real app, use AI to generate a compressed schedule.
  // Mock Response:
  const mockPlan = Array.from({ length: Math.min(days, 7) }).map((_, i) => ({
    day: i + 1,
    topic: 'High-Yield Topic ' + (i + 1),
    hours: 4,
    description: 'Focus on core concepts and past questions.'
  }));

  res.json({ plan: mockPlan });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
