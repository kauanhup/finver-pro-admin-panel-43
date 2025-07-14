import { useState } from "react";
import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";

interface UserLayoutProps {
  children: React.ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
      <UserHeader onToggleSidebar={toggleSidebar} />
      <UserSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <main className="lg:ml-64 mt-16 p-5 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}