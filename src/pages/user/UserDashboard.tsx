import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  BarChart3,
  PlusCircle,
  MinusCircle,
  Eye,
  Calendar,
  Target,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserDashboard() {
  const [balance] = useState(15420.50);
  const [totalInvested] = useState(10000.00);
  const [totalProfit] = useState(5420.50);
  const { toast } = useToast();

  const handleDeposit = () => {
    toast({
      title: "Depósito",
      description: "Redirecionando para área de depósito...",
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Saque",
      description: "Redirecionando para área de saque...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
              FP
            </div>
            <div className="text-xl font-bold text-slate-800">FinverPro</div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">Olá, Investidor!</span>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Bem-vindo à sua carteira!
              </h1>
              <p className="text-white/90 mb-4">
                Acompanhe seus investimentos e resultados em tempo real.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={handleDeposit}
                  variant="secondary" 
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Depositar
                </Button>
                <Button 
                  onClick={handleWithdraw}
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <MinusCircle className="h-4 w-4 mr-2" />
                  Sacar
                </Button>
              </div>
            </div>
            
            <div className="text-4xl opacity-80">
              <Wallet className="h-12 w-12" />
            </div>
          </div>
        </section>

        {/* Balance Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Saldo Total
              </CardTitle>
              <Wallet className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Disponível para saque
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Investido
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">
                R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Capital aplicado
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Lucro Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                +54.2% de rentabilidade
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            onClick={handleDeposit}
            className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <PlusCircle className="h-6 w-6" />
              <span className="font-semibold">Depositar</span>
            </div>
          </Button>

          <Button 
            onClick={handleWithdraw}
            className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <MinusCircle className="h-6 w-6" />
              <span className="font-semibold">Sacar</span>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-20 border-slate-200 hover:bg-slate-50 text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="font-semibold">Relatórios</span>
            </div>
          </Button>

          <Button 
            variant="outline"
            className="h-20 border-slate-200 hover:bg-slate-50 text-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center gap-2">
              <Target className="h-6 w-6" />
              <span className="font-semibold">Estratégias</span>
            </div>
          </Button>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Atividade Recente
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Depósito via PIX</p>
                  <p className="text-sm text-slate-500">Hoje, 14:30</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+R$ 1.000,00</p>
                <p className="text-xs text-slate-500">Confirmado</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Lucro de investimento</p>
                  <p className="text-sm text-slate-500">Ontem, 16:45</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">+R$ 420,50</p>
                <p className="text-xs text-slate-500">Creditado</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}