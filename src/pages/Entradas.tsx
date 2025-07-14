import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, DollarSign, TrendingUp, Clock, Eye, CheckCircle, XCircle, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Entrada {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  emailUsuario: string;
  metodo: "pix" | "cripto";
  valorSolicitado: number;
  valorTaxa: number;
  valorLiquido: number;
  chavePix?: string;
  nomeTitular: string;
  documentoTitular: string;
  codigoReferencia: string;
  gateway: string;
  status: "pendente" | "processando" | "aprovado" | "rejeitado" | "cancelado";
  dataProcessamento?: Date;
  dataCriacao: Date;
  observacoes?: string;
}

export function Entradas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [metodoFilter, setMetodoFilter] = useState<string>("todos");
  const [entradas, setEntradas] = useState<Entrada[]>([
    {
      id: "1",
      usuarioId: "101",
      nomeUsuario: "João Silva",
      emailUsuario: "joao@email.com",
      metodo: "pix",
      valorSolicitado: 1000.00,
      valorTaxa: 0.00,
      valorLiquido: 1000.00,
      chavePix: "joao@email.com",
      nomeTitular: "João Silva",
      documentoTitular: "123.456.789-00",
      codigoReferencia: "DEP001",
      gateway: "pixup",
      status: "aprovado",
      dataProcessamento: new Date("2025-01-15T10:30:00"),
      dataCriacao: new Date("2025-01-15T10:00:00"),
    },
    {
      id: "2",
      usuarioId: "102",
      nomeUsuario: "Maria Santos",
      emailUsuario: "maria@email.com",
      metodo: "pix",
      valorSolicitado: 500.00,
      valorTaxa: 0.00,
      valorLiquido: 500.00,
      chavePix: "+5511999999999",
      nomeTitular: "Maria Santos",
      documentoTitular: "987.654.321-00",
      codigoReferencia: "DEP002",
      gateway: "pixup",
      status: "pendente",
      dataCriacao: new Date("2025-01-15T14:15:00"),
    },
    {
      id: "3",
      usuarioId: "103",
      nomeUsuario: "Pedro Oliveira",
      emailUsuario: "pedro@email.com",
      metodo: "cripto",
      valorSolicitado: 2500.00,
      valorTaxa: 125.00,
      valorLiquido: 2375.00,
      nomeTitular: "Pedro Oliveira",
      documentoTitular: "111.222.333-44",
      codigoReferencia: "DEP003",
      gateway: "coinbase",
      status: "processando",
      dataCriacao: new Date("2025-01-15T09:00:00"),
    },
    {
      id: "4",
      usuarioId: "104",
      nomeUsuario: "Ana Costa",
      emailUsuario: "ana@email.com",
      metodo: "cripto",
      valorSolicitado: 300.00,
      valorTaxa: 15.00,
      valorLiquido: 285.00,
      nomeTitular: "Ana Costa",
      documentoTitular: "555.666.777-88",
      codigoReferencia: "DEP004",
      gateway: "binance",
      status: "aprovado",
      dataProcessamento: new Date("2025-01-14T16:45:00"),
      dataCriacao: new Date("2025-01-14T16:30:00"),
    },
    {
      id: "5",
      usuarioId: "105",
      nomeUsuario: "Carlos Lima",
      emailUsuario: "carlos@email.com",
      metodo: "pix",
      valorSolicitado: 150.00,
      valorTaxa: 0.00,
      valorLiquido: 150.00,
      chavePix: "12345678901",
      nomeTitular: "Carlos Lima",
      documentoTitular: "444.555.666-77",
      codigoReferencia: "DEP005",
      gateway: "pixup",
      status: "rejeitado",
      dataCriacao: new Date("2025-01-14T11:20:00"),
      observacoes: "Dados bancários inconsistentes",
    },
  ]);

  const filteredEntradas = entradas.filter((entrada) => {
    const matchesSearch = 
      entrada.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrada.emailUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrada.codigoReferencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entrada.nomeTitular.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "todos" || entrada.status === statusFilter;
    const matchesMetodo = metodoFilter === "todos" || entrada.metodo === metodoFilter;

    return matchesSearch && matchesStatus && matchesMetodo;
  });

  const getStatusBadge = (status: Entrada['status']) => {
    const variants = {
      aprovado: "default",
      pendente: "secondary", 
      processando: "outline",
      rejeitado: "destructive",
      cancelado: "destructive",
    } as const;

    const colors = {
      aprovado: "text-success",
      pendente: "text-warning", 
      processando: "text-info",
      rejeitado: "text-danger",
      cancelado: "text-danger",
    } as const;

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getMetodoBadge = (metodo: Entrada['metodo']) => {
    const labels = {
      pix: "PIX",
      cripto: "Cripto",
    };

    return (
      <Badge variant="outline" className="text-foreground-secondary">
        {labels[metodo]}
      </Badge>
    );
  };

  const handleAprovarEntrada = (entradaId: string) => {
    setEntradas(prev => prev.map(entrada => 
      entrada.id === entradaId 
        ? { ...entrada, status: "aprovado", dataProcessamento: new Date() }
        : entrada
    ));
  };

  const totalEntradas = entradas.reduce((acc, entrada) => acc + entrada.valorLiquido, 0);
  const entradasPendentes = entradas.filter(entrada => entrada.status === "pendente").length;
  const entradasAprovadas = entradas.filter(entrada => entrada.status === "aprovado").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Entradas Financeiras</h1>
          <p className="text-foreground-secondary">
            Gerencie todos os depósitos e entradas do sistema
          </p>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Total de Entradas</p>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Entradas Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{entradasPendentes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Entradas Aprovadas</p>
              <p className="text-2xl font-bold text-foreground">{entradasAprovadas}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary h-4 w-4" />
            <Input
              placeholder="Buscar por nome, email, código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="processando">Processando</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="rejeitado">Rejeitado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Select value={metodoFilter} onValueChange={setMetodoFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Métodos</SelectItem>
              <SelectItem value="pix">PIX</SelectItem>
              <SelectItem value="cripto">Cripto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tabela de Entradas */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Lista de Entradas ({filteredEntradas.length})
          </h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Valor Solicitado</TableHead>
                  <TableHead>Taxa</TableHead>
                  <TableHead>Valor Líquido</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntradas.map((entrada) => (
                  <TableRow key={entrada.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{entrada.nomeUsuario}</p>
                        <p className="text-sm text-foreground-secondary">{entrada.emailUsuario}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getMetodoBadge(entrada.metodo)}
                    </TableCell>
                    <TableCell>
                      <p className="font-mono text-foreground">
                        R$ {entrada.valorSolicitado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-mono text-danger">
                        R$ {entrada.valorTaxa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-mono text-success font-semibold">
                        R$ {entrada.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <code className="bg-background-secondary px-2 py-1 rounded text-xs">
                        {entrada.codigoReferencia}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{format(entrada.dataCriacao, "dd/MM/yyyy", { locale: ptBR })}</p>
                        <p className="text-xs text-foreground-secondary">
                          {format(entrada.dataCriacao, "HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(entrada.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {entrada.status === "pendente" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAprovarEntrada(entrada.id)}
                            className="text-success border-success hover:bg-success hover:text-white"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Ativar
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}