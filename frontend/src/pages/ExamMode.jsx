import { useState } from 'react';
import { Calendar, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExamMode() {
  const [days, setDays] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!days || isNaN(days) || Number(days) <= 0) return;
    setGenerated(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 mb-10 text-white relative overflow-hidden shadow-2xl shadow-red-500/20">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm font-bold mb-4 backdrop-blur-sm border border-white/20">
            <Zap size={16} className="text-yellow-300" /> Crisis Mode Activated
          </div>
          <h1 className="text-4xl font-black mb-4">Exam Mode</h1>
          <p className="text-white/90 max-w-2xl text-lg">
            Running out of time? Tell us how many days are left until your exam, and our AI will generate a hyper-optimized crash course focusing only on high-yield topics.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none flex items-center justify-center translate-x-1/4">
          <AlertTriangle size={300} />
        </div>
      </div>

      {!generated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-surface-hover rounded-3xl p-8 shadow-xl max-w-xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 text-white">
            <Calendar size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">How much time do we have?</h2>
          <p className="text-text-muted mb-8">Enter the number of days until your exam.</p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <input
              type="number"
              min="1"
              max="100"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-24 text-center bg-background border border-surface-hover rounded-xl py-3 text-2xl font-bold text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              placeholder="0"
            />
            <span className="text-xl font-medium text-text-muted">Days</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!days}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Crash Course
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your {days}-Day Crash Course</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(Math.min(Number(days), 7))].map((_, i) => (
              <div key={i} className="bg-surface border border-surface-hover p-5 rounded-2xl flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center font-bold border border-red-500/20">
                  D{i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">High-Yield Genetics</h3>
                  <p className="text-sm text-text-muted mb-3">Focus on Mendelian laws and DNA replication (Highest exam weightage).</p>
                  <div className="text-xs font-medium px-2 py-1 bg-surface-hover rounded text-text inline-block">
                    4 hrs study • 2 hrs practice
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white text-background rounded-xl font-bold hover:bg-gray-200 transition-colors">
              Start Day 1 Now
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
