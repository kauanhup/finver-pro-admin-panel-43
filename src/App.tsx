import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { UserLayout } from "./components/user/UserLayout";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Usuarios from "./pages/Usuarios";
import { Codigos } from "./pages/Codigos";
import { Investidores } from "./pages/Investidores";
import { Entradas } from "./pages/Entradas";
import { Saidas } from "./pages/Saidas";
import Comissoes from "./pages/Comissoes";
import Imagens from "./pages/Imagens";
import Seo from "./pages/Seo";
import ConfigPagamento from "./pages/ConfigPagamento";
import Login from "./pages/Login";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes (with admin layout) */}
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/cadastro" element={<Layout><Cadastro /></Layout>} />
          <Route path="/usuarios" element={<Layout><Usuarios /></Layout>} />
          <Route path="/codigos" element={<Layout><Codigos /></Layout>} />
          <Route path="/investidores" element={<Layout><Investidores /></Layout>} />
          <Route path="/entradas" element={<Layout><Entradas /></Layout>} />
          <Route path="/saidas" element={<Layout><Saidas /></Layout>} />
          <Route path="/comissoes" element={<Layout><Comissoes /></Layout>} />
          <Route path="/imagens" element={<Layout><Imagens /></Layout>} />
          <Route path="/seo" element={<Layout><Seo /></Layout>} />
          <Route path="/config-pagamento" element={<Layout><ConfigPagamento /></Layout>} />
          <Route path="/login" element={<Login />} />
          
          {/* User Routes (with user layout) */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/dashboard" element={<UserLayout><UserDashboard /></UserLayout>} />
          <Route path="/user/profile" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Perfil do Usuário</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/deposit" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Área de Depósito</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/withdraw" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Área de Saque</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/strategies" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Estratégias</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/history" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Histórico</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/analytics" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Análises</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/settings" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Configurações</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          <Route path="/user/help" element={<UserLayout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-slate-800">Ajuda</h1><p className="text-slate-600 mt-2">Em desenvolvimento...</p></div></UserLayout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
