import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center px-4 shadow-finver backdrop-blur-sm">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-background-tertiary"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <a href="#" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-finver-lg">
              FP
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Finver Pro
            </span>
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-finver-lg cursor-pointer hover:scale-105 transition-transform">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}