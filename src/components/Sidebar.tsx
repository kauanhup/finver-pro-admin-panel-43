import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Banknote,
  BarChart3,
  Package,
  Hash,
  Target,
  CheckSquare,
  ListTodo,
  Settings,
  Type,
  Image,
  LogOut,
  Search
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "Principal",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Usuários", href: "/usuarios", icon: Users },
      { name: "Cadastro", href: "/cadastro", icon: UserPlus },
    ]
  },
  {
    title: "Financeiro",
    items: [
      { name: "Entradas Geral", href: "/entradas", icon: TrendingUp },
      { name: "Saídas", href: "/saidas", icon: TrendingDown },
      { name: "Comissões", href: "/comissoes", icon: DollarSign },
      { name: "Salário", href: "/salarios", icon: Banknote },
    ]
  },
  {
    title: "Plataforma",
    items: [
      { name: "Investidores", href: "/investidores", icon: BarChart3 },
      { name: "Produtos", href: "/produtos", icon: Package },
      { name: "Códigos", href: "/codigos", icon: Hash },
      { name: "Roleta", href: "/roleta", icon: Target },
      { name: "Tarefas", href: "/tarefas", icon: CheckSquare },
      { name: "Checklist", href: "/checklist", icon: ListTodo },
    ]
  },
  {
    title: "Configurações",
    items: [
      { name: "Config de Pagamento", href: "/config-pagamento", icon: Settings },
    ]
  },
  {
    title: "Personalização",
    items: [
      { name: "Personalização de Textos", href: "/textos", icon: Type },
      { name: "Personalizar Imagens", href: "/imagens", icon: Image },
      { name: "Configurações de SEO", href: "/seo", icon: Search },
    ]
  },
  {
    title: "Sistema",
    items: [
      { name: "Sair", href: "/login", icon: LogOut },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        "fixed top-16 left-0 w-60 h-[calc(100vh-4rem)] bg-background border-r border-border z-50 transition-transform duration-300 shadow-finver-lg overflow-y-auto",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-bold text-foreground-muted uppercase tracking-wider mb-3 px-3">
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
                          ? "bg-background-secondary text-primary translate-x-1 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary before:scale-y-100" 
                          : "text-foreground-secondary hover:bg-background-secondary hover:text-primary hover:translate-x-1 before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-primary before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-200"
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