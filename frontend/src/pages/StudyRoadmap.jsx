import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle, Circle, ChevronRight, FileX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSyllabus } from '../context/SyllabusContext';

export default function StudyRoadmap() {
  const { syllabusData } = useSyllabus();
  const roadmap = syllabusData || [
    {
      id: 1,
      chapter: 'Upload a syllabus to generate your personalized roadmap!',
      status: 'pending',
      topics: []
    }
  ];

  if (!syllabusData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 border border-surface-hover">
          <FileX size={40} className="text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No Syllabus Uploaded</h2>
        <p className="text-text-muted mb-8 max-w-md">You haven't uploaded a syllabus yet. Please upload one to generate your AI-powered study roadmap.</p>
        <Link to="/upload" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg transition-colors">
          Go to Upload
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Study Roadmap</h1>
          <p className="text-text-muted">Your structured path to mastering the syllabus.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-muted mb-1">Overall Progress</p>
          <div className="flex items-center gap-3">
            <div className="w-48 h-2 bg-surface-hover rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 w-[35%] rounded-full"></div>
            </div>
            <span className="text-white font-bold text-lg">35%</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-surface-hover"></div>

        <div className="space-y-8">
          {roadmap.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-16"
            >
              {/* Node dot */}
              <div className={`absolute left-[22px] top-6 w-4 h-4 rounded-full border-4 border-background transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                chapter.status === 'completed' ? 'bg-green-500' :
                chapter.status === 'in-progress' ? 'bg-primary-500' : 'bg-surface-hover'
              }`}></div>

              <div className={`bg-surface border rounded-2xl p-6 transition-all hover:shadow-lg ${
                chapter.status === 'in-progress' ? 'border-primary-500/50 shadow-primary-500/10' : 'border-surface-hover'
              }`}>
                <h2 className="text-xl font-bold text-white mb-4">{chapter.chapter}</h2>
                
                <div className="space-y-3">
                  {chapter.topics.map((topic) => (
                    <Link
                      to={`/topic/${topic.id}`}
                      key={topic.id}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {topic.status === 'completed' ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : topic.status === 'in-progress' ? (
                          <PlayCircle className="text-primary-500" size={20} />
                        ) : (
                          <Circle className="text-text-muted" size={20} />
                        )}
                        <span className={`font-medium ${
                          topic.status === 'completed' ? 'text-text-muted line-through' :
                          topic.status === 'in-progress' ? 'text-primary-400' : 'text-white'
                        }`}>
                          {topic.title}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
