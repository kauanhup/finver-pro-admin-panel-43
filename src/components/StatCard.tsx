import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor: "success" | "danger" | "warning" | "info" | "purple" | "pink";
}

const iconColorClasses = {
  success: "bg-gradient-success",
  danger: "bg-gradient-danger", 
  warning: "bg-gradient-warning",
  info: "bg-gradient-info",
  purple: "bg-gradient-purple",
  pink: "bg-gradient-pink",
};

export function StatCard({ title, value, icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="bg-background border border-border rounded-xl p-5 shadow-finver transition-all duration-300 hover:shadow-finver-xl hover:-translate-y-1 relative overflow-hidden group">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1 leading-none">
            {value}
          </h3>
          <p className="text-xs text-foreground-secondary font-semibold uppercase tracking-wider">
            {title}
          </p>
        </div>
        
        <div className={cn(
          "w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-finver-lg",
          iconColorClasses[iconColor]
        )}>
          <Icon className="h-4 w-4 font-bold" />
        </div>
      </div>
    </div>
  );
}