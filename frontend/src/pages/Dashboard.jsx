import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Target, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Topics Completed', value: '12/48', icon: <CheckCircle className="text-green-500" size={24} />, bg: 'bg-green-500/10' },
    { title: 'Study Streak', value: '4 Days', icon: <TrendingUp className="text-orange-500" size={24} />, bg: 'bg-orange-500/10' },
    { title: 'Daily Target', value: '80%', icon: <Target className="text-primary-500" size={24} />, bg: 'bg-primary-500/10' },
    { title: 'Active Syllabus', value: '1', icon: <BookOpen className="text-purple-500" size={24} />, bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h1>
        <p className="text-text-muted">Here's your study progress for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface p-6 rounded-2xl border border-surface-hover flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-text-muted font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-2xl border border-surface-hover">
          <h2 className="text-xl font-bold text-white mb-4">Recent Topics</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-surface-hover bg-background/50 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-white">Photosynthesis</h4>
                <p className="text-sm text-text-muted">Chapter 4: Plant Biology</p>
              </div>
              <button className="px-4 py-2 bg-primary-500/10 text-primary-500 rounded-lg text-sm font-medium hover:bg-primary-500 hover:text-white transition-colors">
                Resume
              </button>
            </div>
            <div className="p-4 rounded-xl border border-surface-hover bg-background/50 flex justify-between items-center opacity-70">
              <div>
                <h4 className="font-semibold text-white">Cell Structure</h4>
                <p className="text-sm text-text-muted">Chapter 2: Cell Biology</p>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20 flex items-center gap-1">
                <CheckCircle size={12} /> Completed
              </span>
            </div>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-surface-hover">
          <h2 className="text-xl font-bold text-white mb-4">Up Next</h2>
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-white/80 mb-1 block">Next Target</span>
              <h3 className="text-lg font-bold mb-2">Human Anatomy</h3>
              <p className="text-sm text-white/80 mb-4">Estimated time: 2 hours</p>
              <button className="w-full py-2 bg-white text-primary-600 font-bold rounded-lg text-sm hover:bg-opacity-90 transition-opacity shadow-lg">
                Start Studying
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-20">
              <BookOpen size={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
