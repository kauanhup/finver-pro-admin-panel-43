import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/StatCard";
import { TransactionItem } from "@/components/TransactionItem";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  TrendingDown, 
  Percent, 
  Banknote, 
  Wallet,
  UserCheck,
  Hash,
  Calendar,
  Search,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [isFiltering, setIsFiltering] = useState(false);
  const { toast } = useToast();

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Erro",
        description: "Por favor, selecione ambas as datas para filtrar",
        variant: "destructive",
      });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast({
        title: "Erro", 
        description: "A data inicial não pode ser maior que a data final!",
        variant: "destructive",
      });
      return;
    }

    setIsFiltering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsFiltering(false);
      toast({
        title: "Filtro aplicado",
        description: `Dados filtrados de ${new Date(startDate).toLocaleDateString('pt-BR')} até ${new Date(endDate).toLocaleDateString('pt-BR')}`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden shadow-finver-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold mb-2 leading-tight">
              Bem-vindo, Administrador!
            </h1>
            <p className="text-white/90 text-sm mb-4 font-medium">
              Gerencie sua plataforma Finver Pro com facilidade e eficiência.
            </p>
            <Button variant="secondary" className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
              <ArrowRight className="h-4 w-4 mr-2" />
              Acessar Plataforma
            </Button>
          </div>
          
          <div className="text-4xl opacity-80 font-bold">
            <BarChart3 className="h-10 w-10" />
          </div>
        </div>
      </section>

      {/* Date Filter */}
      <section className="bg-background border border-border rounded-xl p-5 shadow-finver transition-all duration-300 hover:shadow-finver-lg hover:-translate-y-0.5">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Filtrar por Período
        </h2>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-background-secondary border-border-light focus:border-primary min-w-36"
          />
          <span className="text-foreground-secondary font-semibold text-sm">até</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-background-secondary border-border-light focus:border-primary min-w-36"
          />
          <Button 
            onClick={handleFilter}
            disabled={isFiltering}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-finver hover:shadow-finver-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            {isFiltering ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Filtrando...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Filtrar Dados
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Depósitos Hoje"
          value="R$ 12.450"
          icon={TrendingUp}
          iconColor="success"
        />
        <StatCard
          title="Total Depósitos"
          value="R$ 485.230"
          icon={DollarSign}
          iconColor="success"
        />
        <StatCard
          title="Cadastros Hoje"
          value="25"
          icon={Users}
          iconColor="info"
        />
        <StatCard
          title="Total Cadastros"
          value="1.247"
          icon={BarChart3}
          iconColor="info"
        />
        <StatCard
          title="Total Sacado"
          value="R$ 128.750"
          icon={TrendingDown}
          iconColor="danger"
        />
        <StatCard
          title="Comissões Hoje"
          value="R$ 2.580"
          icon={Percent}
          iconColor="warning"
        />
        <StatCard
          title="Salários Hoje"
          value="R$ 8.200"
          icon={Banknote}
          iconColor="purple"
        />
        <StatCard
          title="Saldo Plataforma"
          value="R$ 311.160"
          icon={Wallet}
          iconColor="success"
        />
        <StatCard
          title="Investidores Ativos"
          value="892"
          icon={UserCheck}
          iconColor="pink"
        />
        <StatCard
          title="Códigos Usados"
          value="156"
          icon={Hash}
          iconColor="info"
        />
      </section>

      {/* Recent Transactions */}
      <section className="bg-background border border-border rounded-xl p-6 shadow-finver transition-all duration-300 hover:shadow-finver-lg">
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Transações Recentes
        </h2>
        
        <div className="space-y-0">
          <TransactionItem
            type="Depósito PIX"
            date="10/01/2025 - 14:30"
            amount="+R$ 2.500,00"
            icon={TrendingUp}
            iconColor="success"
            amountColor="success"
          />
          <TransactionItem
            type="Saque Investidor"
            date="09/01/2025 - 16:45"
            amount="-R$ 1.200,00"
            icon={TrendingDown}
            iconColor="danger"
            amountColor="danger"
          />
          <TransactionItem
            type="Comissão Afiliado"
            date="09/01/2025 - 12:15"
            amount="-R$ 450,00"
            icon={Percent}
            iconColor="warning"
            amountColor="warning"
          />
        </div>
      </section>
    </div>
  );
}