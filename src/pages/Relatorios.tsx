import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Users, DollarSign, Download, Calendar, Target } from "lucide-react";

export default function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30');

  // Dados mockados para os gráficos
  const dadosFinanceiros = [
    { nome: 'Jan', depositos: 4000, saques: 2400, lucro: 1600 },
    { nome: 'Fev', depositos: 3000, saques: 1398, lucro: 1602 },
    { nome: 'Mar', depositos: 2000, saques: 9800, lucro: -7800 },
    { nome: 'Abr', depositos: 2780, saques: 3908, lucro: -1128 },
    { nome: 'Mai', depositos: 1890, saques: 4800, lucro: -2910 },
    { nome: 'Jun', depositos: 2390, saques: 3800, lucro: -1410 },
    { nome: 'Jul', depositos: 3490, saques: 4300, lucro: -810 },
  ];

  const dadosUsuarios = [
    { nome: 'Jan', novos: 45, ativos: 320 },
    { nome: 'Fev', novos: 32, ativos: 340 },
    { nome: 'Mar', novos: 28, ativos: 355 },
    { nome: 'Abr', novos: 67, ativos: 380 },
    { nome: 'Mai', novos: 84, ativos: 420 },
    { nome: 'Jun', novos: 92, ativos: 465 },
    { nome: 'Jul', novos: 78, ativos: 498 },
  ];

  const dadosProdutos = [
    { nome: 'Robô IA Básico', vendas: 45, receita: 6750 },
    { nome: 'Robô IA Premium', vendas: 28, receita: 14000 },
    { nome: 'Robô IA VIP', vendas: 12, receita: 12000 },
    { nome: 'Robô IA Elite', vendas: 8, receita: 16000 },
  ];

  const dadosComissoes = [
    { nivel: 'Nível 1', valor: 2400, percentual: 45 },
    { nivel: 'Nível 2', valor: 1800, percentual: 35 },
    { nivel: 'Nível 3', valor: 1200, percentual: 20 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  const metricas = [
    { titulo: 'Receita Total', valor: 'R$ 48.750', variacao: '+12.5%', icon: DollarSign, cor: 'text-green-600' },
    { titulo: 'Usuários Ativos', valor: '498', variacao: '+8.2%', icon: Users, cor: 'text-blue-600' },
    { titulo: 'Produtos Vendidos', valor: '93', variacao: '+15.3%', icon: Target, cor: 'text-purple-600' },
    { titulo: 'Taxa de Conversão', valor: '18.5%', variacao: '+2.1%', icon: TrendingUp, cor: 'text-orange-600' },
  ];

  const topUsuarios = [
    { nome: 'João Silva', investimentos: 'R$ 15.000', comissoes: 'R$ 2.400', nivel: 'VIP' },
    { nome: 'Maria Santos', investimentos: 'R$ 12.500', comissoes: 'R$ 1.800', nivel: 'Premium' },
    { nome: 'Pedro Costa', investimentos: 'R$ 9.800', comissoes: 'R$ 1.200', nivel: 'Premium' },
    { nome: 'Ana Oliveira', investimentos: 'R$ 8.200', comissoes: 'R$ 980', nivel: 'Básico' },
    { nome: 'Carlos Lima', investimentos: 'R$ 7.500', comissoes: 'R$ 750', nivel: 'Básico' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">Análises e insights da plataforma</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 dias</SelectItem>
              <SelectItem value="30">30 dias</SelectItem>
              <SelectItem value="90">90 dias</SelectItem>
              <SelectItem value="365">1 ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metricas.map((metrica, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metrica.titulo}</p>
                  <p className="text-2xl font-bold">{metrica.valor}</p>
                  <p className={`text-sm ${metrica.cor}`}>{metrica.variacao}</p>
                </div>
                <metrica.icon className={`h-8 w-8 ${metrica.cor}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="financeiro" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="comissoes">Comissões</TabsTrigger>
        </TabsList>

        <TabsContent value="financeiro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo Financeiro</CardTitle>
              <CardDescription>Depósitos, saques e lucro líquido por período</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosFinanceiros}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="depositos" fill="#8884d8" name="Depósitos" />
                  <Bar dataKey="saques" fill="#82ca9d" name="Saques" />
                  <Bar dataKey="lucro" fill="#ffc658" name="Lucro Líquido" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Usuários</CardTitle>
                <CardDescription>Novos usuários vs usuários ativos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dadosUsuarios}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="novos" stroke="#8884d8" name="Novos Usuários" />
                    <Line type="monotone" dataKey="ativos" stroke="#82ca9d" name="Usuários Ativos" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Usuários</CardTitle>
                <CardDescription>Usuários com maiores investimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsuarios.map((usuario, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{usuario.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          Investimentos: {usuario.investimentos}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{usuario.nivel}</Badge>
                        <p className="text-sm text-green-600">{usuario.comissoes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="produtos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance de Produtos</CardTitle>
              <CardDescription>Vendas e receita por produto</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dadosProdutos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" fill="#8884d8" name="Vendas" />
                  <Bar dataKey="receita" fill="#82ca9d" name="Receita (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comissoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Comissões</CardTitle>
              <CardDescription>Comissões pagas por nível</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dadosComissoes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nome, percentual }) => `${nome}: ${percentual}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {dadosComissoes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}