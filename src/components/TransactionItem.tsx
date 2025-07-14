import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  type: string;
  date: string;
  amount: string;
  icon: LucideIcon;
  iconColor: "success" | "danger" | "warning" | "info";
  amountColor: "success" | "danger" | "warning";
}

const iconColorClasses = {
  success: "bg-gradient-success",
  danger: "bg-gradient-danger",
  warning: "bg-gradient-warning", 
  info: "bg-gradient-info",
};

const amountColorClasses = {
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
};

export function TransactionItem({ 
  type, 
  date, 
  amount, 
  icon: Icon, 
  iconColor, 
  amountColor 
}: TransactionItemProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border-light last:border-b-0 transition-all duration-200 hover:bg-background-secondary hover:-mx-3 hover:px-3 hover:rounded-lg">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-finver",
          iconColorClasses[iconColor]
        )}>
          <Icon className="h-3 w-3 font-bold" />
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            {type}
          </h4>
          <span className="text-xs text-foreground-secondary font-medium">
            {date}
          </span>
        </div>
      </div>
      
      <div className={cn(
        "text-sm font-bold",
        amountColorClasses[amountColor]
      )}>
        {amount}
      </div>
    </div>
  );
}