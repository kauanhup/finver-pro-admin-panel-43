import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle,
  MinusCircle,
  BarChart3,
  History,
  Target,
  Settings,
  User,
  HelpCircle,
  LogOut
} from "lucide-react";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const userNavigation = [
  {
    title: "Início",
    items: [
      { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
      { name: "Meu Perfil", href: "/user/profile", icon: User },
    ]
  },
  {
    title: "Investimentos",
    items: [
      { name: "Depositar", href: "/user/deposit", icon: PlusCircle },
      { name: "Sacar", href: "/user/withdraw", icon: MinusCircle },
      { name: "Estratégias", href: "/user/strategies", icon: Target },
    ]
  },
  {
    title: "Relatórios",
    items: [
      { name: "Histórico", href: "/user/history", icon: History },
      { name: "Análises", href: "/user/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Configurações",
    items: [
      { name: "Ajustes", href: "/user/settings", icon: Settings },
      { name: "Ajuda", href: "/user/help", icon: HelpCircle },
      { name: "Sair", href: "/user/login", icon: LogOut },
    ]
  }
];

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 z-50 transition-transform duration-300 shadow-lg overflow-y-auto",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5">
          {userNavigation.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">
                {section.title}
              </h3>
              
              <nav className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                      className={cn(
                        "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden group",
                        isActive 
                          ? "bg-slate-100 text-blue-600 translate-x-1 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-blue-600 before:scale-y-100" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:translate-x-1 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-blue-600 before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-200"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}