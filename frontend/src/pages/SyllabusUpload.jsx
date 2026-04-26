import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSyllabus } from '../context/SyllabusContext';
import { useNavigate } from 'react-router-dom';

export default function SyllabusUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setSyllabusData } = useSyllabus();
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:5000/api/syllabus/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setSyllabusData(data.roadmap);
        setSuccess(true);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Upload Syllabus</h1>
        <p className="text-text-muted">Upload your course syllabus PDF and let AI generate a customized study plan for you.</p>
      </div>

      {!success ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-3xl p-8 border border-surface-hover shadow-xl"
        >
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-surface-hover hover:border-primary-500 transition-colors rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-background/50 relative overflow-hidden group cursor-pointer"
          >
            <input 
              type="file" 
              accept=".pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              onChange={(e) => setFile(e.target.files[0])}
            />
            
            <div className="w-20 h-20 rounded-full bg-primary-500/10 text-primary-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud size={40} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              {file ? file.name : "Drag & Drop your PDF here"}
            </h3>
            <p className="text-text-muted mb-6">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "or click to browse from your computer"}
            </p>

          </div>
          
          <div className="mt-8 text-center relative z-20">
            <button 
              className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
                file ? 'bg-primary-600 hover:bg-primary-500 shadow-primary-500/25' : 'bg-surface-hover text-text-muted cursor-not-allowed'
              }`}
              disabled={!file || uploading}
              onClick={(e) => { e.preventDefault(); handleUpload(); }}
            >
              {uploading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing PDF...
                </div>
              ) : "Generate Study Plan"}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-3xl p-12 border border-green-500/30 shadow-xl text-center shadow-green-500/10"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Syllabus Processed Successfully!</h2>
          <p className="text-text-muted mb-8">We've extracted all chapters and topics. Your personalized roadmap is ready.</p>
          <button 
            onClick={() => navigate('/roadmap')} 
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/25"
          >
            <FileText size={20} /> View Study Roadmap
          </button>
        </motion.div>
      )}
    </div>
  );
}
