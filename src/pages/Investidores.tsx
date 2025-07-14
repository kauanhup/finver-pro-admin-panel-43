import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Users, DollarSign, Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Investidor {
  id: string;
  nomeUsuario: string;
  email: string;
  produto: string;
  valorInvestido: number;
  dataInvestimento: Date;
  status: "ativo" | "concluido" | "cancelado";
}

export function Investidores() {
  const [investidores] = useState<Investidor[]>([
    {
      id: "1",
      nomeUsuario: "João Silva",
      email: "joao@email.com",
      produto: "CDB Premium 120% CDI",
      valorInvestido: 50000,
      dataInvestimento: new Date("2025-01-10"),
      status: "ativo"
    },
    {
      id: "2", 
      nomeUsuario: "Maria Santos",
      email: "maria@email.com",
      produto: "LCI Imobiliária",
      valorInvestido: 25000,
      dataInvestimento: new Date("2025-01-08"),
      status: "ativo"
    },
    {
      id: "3",
      nomeUsuario: "Pedro Costa",
      email: "pedro@email.com", 
      produto: "Tesouro SELIC 2029",
      valorInvestido: 15000,
      dataInvestimento: new Date("2025-01-05"),
      status: "concluido"
    },
    {
      id: "4",
      nomeUsuario: "Ana Oliveira",
      email: "ana@email.com",
      produto: "Fundo Multimercado",
      valorInvestido: 75000,
      dataInvestimento: new Date("2024-12-20"),
      status: "ativo"
    },
    {
      id: "5",
      nomeUsuario: "Carlos Lima",
      email: "carlos@email.com",
      produto: "CDB Pré-fixado 12%",
      valorInvestido: 30000,
      dataInvestimento: new Date("2024-12-15"),
      status: "cancelado"
    }
  ]);

  const [busca, setBusca] = useState("");

  const investidoresFiltrados = investidores.filter(investidor =>
    investidor.nomeUsuario.toLowerCase().includes(busca.toLowerCase()) ||
    investidor.produto.toLowerCase().includes(busca.toLowerCase()) ||
    investidor.email.toLowerCase().includes(busca.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="default" className="bg-success text-white">Ativo</Badge>;
      case "concluido":
        return <Badge variant="secondary">Concluído</Badge>;
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalInvestido = investidores.reduce((acc, inv) => acc + inv.valorInvestido, 0);
  const investidoresAtivos = investidores.filter(inv => inv.status === "ativo").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Investidores</h1>
            <p className="text-foreground-secondary">Gerencie e visualize investimentos dos usuários</p>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">Total Investido</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-foreground-secondary">Investidores Ativos</p>
                <p className="text-2xl font-bold text-foreground">{investidoresAtivos}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary h-4 w-4" />
              <Input
                placeholder="Buscar por nome, email ou produto..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabela de Investidores */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Investidor</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Valor Investido</TableHead>
                  <TableHead>Data Investimento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investidoresFiltrados.map((investidor) => (
                  <TableRow key={investidor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{investidor.nomeUsuario}</p>
                        <p className="text-sm text-foreground-secondary">{investidor.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-foreground">{investidor.produto}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-mono text-foreground">
                        R$ {investidor.valorInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </TableCell>
                    <TableCell>
                      {format(investidor.dataInvestimento, "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(investidor.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {investidoresFiltrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-foreground-secondary">Nenhum investidor encontrado</p>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}