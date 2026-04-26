import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileUp, Map, CalendarClock, BookOpen } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Upload Syllabus', path: '/upload', icon: <FileUp size={20} /> },
    { name: 'Study Roadmap', path: '/roadmap', icon: <Map size={20} /> },
    { name: 'Exam Mode', path: '/exam-mode', icon: <CalendarClock size={20} /> },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-surface-hover h-screen flex flex-col hidden md:flex sticky top-0">
      <div className="p-6 flex items-center gap-3 border-b border-surface-hover">
        <div className="bg-primary-500 p-2 rounded-lg text-white">
          <BookOpen size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Study<span className="text-primary-500">AI</span></h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500/10 text-primary-500 font-medium'
                  : 'text-text-muted hover:bg-surface-hover hover:text-white'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
