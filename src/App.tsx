import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
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
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/codigos" element={<Codigos />} />
            <Route path="/investidores" element={<Investidores />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/saidas" element={<Saidas />} />
            <Route path="/comissoes" element={<Comissoes />} />
            <Route path="/imagens" element={<Imagens />} />
            <Route path="/seo" element={<Seo />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
