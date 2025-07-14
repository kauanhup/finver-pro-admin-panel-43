import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, DollarSign, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Operacao {
  id: number;
  usuario: string;
  tipo: 'deposito' | 'saque';
  valor: number;
  metodo: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  data: string;
  chavePix?: string;
}

export default function Operacoes() {
  const { toast } = useToast();
  
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    status: 'todos',
    periodo: '7',
    busca: ''
  });

  const [operacoes] = useState<Operacao[]>([
    { id: 1, usuario: "João Silva", tipo: "deposito", valor: 150.00, metodo: "PIX", status: "pendente", data: "2024-01-15", chavePix: "joao@email.com" },
    { id: 2, usuario: "Maria Santos", tipo: "saque", valor: 89.50, metodo: "PIX", status: "aprovado", data: "2024-01-14", chavePix: "maria@email.com" },
    { id: 3, usuario: "Pedro Costa", tipo: "deposito", valor: 300.00, metodo: "PIX", status: "aprovado", data: "2024-01-14" },
    { id: 4, usuario: "Ana Oliveira", tipo: "saque", valor: 45.00, metodo: "PIX", status: "rejeitado", data: "2024-01-13" },
    { id: 5, usuario: "Carlos Lima", tipo: "deposito", valor: 200.00, metodo: "PIX", status: "pendente", data: "2024-01-13" },
  ]);

  const handleAprovar = (id: number) => {
    toast({
      title: "Operação aprovada",
      description: "A operação foi processada com sucesso.",
    });
  };

  const handleRejeitar = (id: number) => {
    toast({
      title: "Operação rejeitada",
      description: "A operação foi rejeitada.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'aprovado':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Aprovado</Badge>;
      case 'rejeitado':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejeitado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'deposito' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const operacoesFiltradas = operacoes.filter(op => {
    const matchTipo = filtros.tipo === 'todos' || op.tipo === filtros.tipo;
    const matchStatus = filtros.status === 'todos' || op.status === filtros.status;
    const matchBusca = filtros.busca === '' || op.usuario.toLowerCase().includes(filtros.busca.toLowerCase());
    return matchTipo && matchStatus && matchBusca;
  });

  const totalDepositos = operacoes.filter(op => op.tipo === 'deposito').reduce((sum, op) => sum + op.valor, 0);
  const totalSaques = operacoes.filter(op => op.tipo === 'saque').reduce((sum, op) => sum + op.valor, 0);
  const pendentes = operacoes.filter(op => op.status === 'pendente').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Operações Financeiras</h1>
          <p className="text-muted-foreground">Gerencie depósitos, saques e transações</p>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Depósitos</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalDepositos.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Saques</p>
                <p className="text-2xl font-bold text-red-600">R$ {totalSaques.toFixed(2)}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo Líquido</p>
                <p className="text-2xl font-bold">R$ {(totalDepositos - totalSaques).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-orange-600">{pendentes}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={filtros.tipo} onValueChange={(value) => setFiltros({...filtros, tipo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="deposito">Depósitos</SelectItem>
                  <SelectItem value="saque">Saques</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={filtros.status} onValueChange={(value) => setFiltros({...filtros, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="aprovado">Aprovados</SelectItem>
                  <SelectItem value="rejeitado">Rejeitados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="periodo">Período</Label>
              <Select value={filtros.periodo} onValueChange={(value) => setFiltros({...filtros, periodo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="7 dias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 dias</SelectItem>
                  <SelectItem value="30">30 dias</SelectItem>
                  <SelectItem value="90">90 dias</SelectItem>
                  <SelectItem value="365">1 ano</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="busca">Buscar usuário</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busca"
                  placeholder="Nome do usuário..."
                  value={filtros.busca}
                  onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Operações */}
      <Card>
        <CardHeader>
          <CardTitle>Operações Recentes</CardTitle>
          <CardDescription>
            {operacoesFiltradas.length} operação(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Chave PIX</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operacoesFiltradas.map((operacao) => (
                <TableRow key={operacao.id}>
                  <TableCell className="font-medium">{operacao.usuario}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTipoIcon(operacao.tipo)}
                      <span className="capitalize">{operacao.tipo}</span>
                    </div>
                  </TableCell>
                  <TableCell>R$ {operacao.valor.toFixed(2)}</TableCell>
                  <TableCell>{operacao.metodo}</TableCell>
                  <TableCell>{getStatusBadge(operacao.status)}</TableCell>
                  <TableCell>{operacao.data}</TableCell>
                  <TableCell>{operacao.chavePix || '-'}</TableCell>
                  <TableCell>
                    {operacao.status === 'pendente' && (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleAprovar(operacao.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejeitar(operacao.id)}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}