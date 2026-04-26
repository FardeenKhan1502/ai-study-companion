import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SyllabusUpload from './pages/SyllabusUpload';
import StudyRoadmap from './pages/StudyRoadmap';
import TopicDetail from './pages/TopicDetail';
import ExamMode from './pages/ExamMode';
import { SyllabusProvider } from './context/SyllabusContext';

function App() {
  return (
    <Router>
      <SyllabusProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<SyllabusUpload />} />
            <Route path="/roadmap" element={<StudyRoadmap />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
            <Route path="/exam-mode" element={<ExamMode />} />
          </Routes>
        </Layout>
      </SyllabusProvider>
    </Router>
  );
}

export default App;
