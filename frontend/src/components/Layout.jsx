import Sidebar from './Sidebar';
import Chatbot from './Chatbot';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-0 pb-24">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        <Chatbot />
      </div>
    </div>
  );
}
