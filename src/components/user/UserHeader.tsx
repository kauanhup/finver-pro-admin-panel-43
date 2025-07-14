import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserHeaderProps {
  onToggleSidebar: () => void;
}

export function UserHeader({ onToggleSidebar }: UserHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center px-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-slate-100"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <a href="/user/dashboard" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg">
              FP
            </div>
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              FinverPro
            </span>
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hover:bg-slate-100">
            <Bell className="h-5 w-5 text-slate-600" />
          </Button>
          
          <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
            U
          </div>
        </div>
      </div>
    </header>
  );
}