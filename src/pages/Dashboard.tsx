import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/StatCard";
import { TransactionItem } from "@/components/TransactionItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: '3 saques pendentes de aprovação', action: 'Ver saques' },
    { id: 2, type: 'info', message: 'Atualização do sistema programada para amanhã', action: 'Detalhes' },
    { id: 3, type: 'success', message: 'Meta de vendas de janeiro atingida!', action: 'Relatório' },
  ]);
  const [metrics, setMetrics] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalDeposits: 485230,
    totalWithdrawals: 128750,
    platformBalance: 311160,
    pendingOperations: 15,
    conversionRate: 18.5,
    growthRate: 12.3
  });
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

      {/* Alertas e Notificações */}
      <section className="bg-background border border-border rounded-xl p-6 shadow-finver transition-all duration-300 hover:shadow-finver-lg">
        <h2 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Alertas Importantes
        </h2>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border flex items-center justify-between ${
              alert.type === 'warning' ? 'bg-warning/10 border-warning/30' :
              alert.type === 'info' ? 'bg-info/10 border-info/30' :
              'bg-success/10 border-success/30'
            }`}>
              <div className="flex items-center gap-3">
                {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-warning" />}
                {alert.type === 'info' && <Activity className="h-5 w-5 text-info" />}
                {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-success" />}
                <span className="text-foreground font-medium">{alert.message}</span>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                {alert.action}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Performance da Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Taxa de Conversão</span>
                <span className="text-foreground font-medium">{metrics.conversionRate}%</span>
              </div>
              <Progress value={metrics.conversionRate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Crescimento Mensal</span>
                <span className="text-foreground font-medium">{metrics.growthRate}%</span>
              </div>
              <Progress value={metrics.growthRate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground-secondary">Usuários Ativos</span>
                <span className="text-foreground font-medium">{((metrics.activeUsers / metrics.totalUsers) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(metrics.activeUsers / metrics.totalUsers) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Operações Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Saques Pendentes</p>
                    <p className="text-sm text-foreground-secondary">Aguardando aprovação</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-warning border-warning/30">
                  {metrics.pendingOperations}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-info/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Novos Cadastros</p>
                    <p className="text-sm text-foreground-secondary">Últimas 24h</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-info border-info/30">
                  25
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Sistema</p>
                    <p className="text-sm text-foreground-secondary">Funcionando normalmente</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success/30">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <TransactionItem
            type="Investimento VIP"
            date="08/01/2025 - 09:20"
            amount="+R$ 5.000,00"
            icon={TrendingUp}
            iconColor="success"
            amountColor="success"
          />
          <TransactionItem
            type="Comissão Nivel 2"
            date="08/01/2025 - 08:15"
            amount="-R$ 320,00"
            icon={Percent}
            iconColor="warning"
            amountColor="warning"
          />
        </div>
      </section>
    </div>
  );
}