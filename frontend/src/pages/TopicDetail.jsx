import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Eye, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopicDetail() {
  const { id } = useParams();

  // Mock data
  const topicTitle = "DNA and RNA Structure";
  
  const videos = [
    {
      id: "vid1",
      title: "DNA vs RNA (Updated)",
      channel: "Amoeba Sisters",
      views: "2.5M",
      duration: "6:31",
      thumbnail: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400&h=225",
      matchScore: "98%"
    },
    {
      id: "vid2",
      title: "What is DNA and How Does it Work?",
      channel: "Stated Clearly",
      views: "4.1M",
      duration: "5:24",
      thumbnail: "https://images.unsplash.com/photo-1614914135224-9ea6f91f3e7b?auto=format&fit=crop&q=80&w=400&h=225",
      matchScore: "95%"
    },
    {
      id: "vid3",
      title: "Nucleic acids - DNA and RNA structure",
      channel: "Khan Academy",
      views: "1.2M",
      duration: "14:15",
      thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400&h=225",
      matchScore: "92%"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Link to="/roadmap" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6">
        <ArrowLeft size={20} /> Back to Roadmap
      </Link>

      <div className="mb-10">
        <div className="inline-block px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-sm font-medium mb-3 border border-primary-500/20">
          Chapter 2: Genetics
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">{topicTitle}</h1>
        <p className="text-text-muted max-w-3xl leading-relaxed">
          In this topic, you will learn about the molecular structure of DNA and RNA, the differences between them, and their critical roles in genetic inheritance and protein synthesis.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recommended Videos</h2>
        <span className="text-sm text-text-muted">Curated using AI</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-surface rounded-2xl overflow-hidden border border-surface-hover group hover:border-primary-500/50 transition-colors"
          >
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <Play size={24} className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium flex items-center gap-1">
                <Clock size={12} /> {video.duration}
              </div>
              <div className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded text-xs text-white font-bold shadow-lg">
                {video.matchScore} Match
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1 line-clamp-2 leading-snug">{video.title}</h3>
              <p className="text-sm text-text-muted mb-3">{video.channel}</p>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <div className="flex items-center gap-1">
                  <Eye size={14} /> {video.views}
                </div>
                <button className="text-primary-400 hover:text-primary-300 font-medium">Watch Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-surface border border-surface-hover rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Finished studying?</h3>
          <p className="text-sm text-text-muted">Mark this topic as complete to track your progress.</p>
        </div>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-500/20">
          Mark as Complete
        </button>
      </div>
    </div>
  );
}
