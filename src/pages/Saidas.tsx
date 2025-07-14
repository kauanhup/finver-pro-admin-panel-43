import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Search, DollarSign, TrendingDown, Clock, Eye, Check, X, Settings, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Saida {
  id: string;
  usuarioId: string;
  nomeUsuario: string;
  emailUsuario: string;
  metodo: "pix";
  valorSolicitado: number;
  valorTaxa: number;
  valorLiquido: number;
  chavePix?: string;
  nomeTitular: string;
  documentoTitular: string;
  codigoReferencia: string;
  status: "pendente" | "processando" | "aprovado" | "rejeitado" | "cancelado";
  dataProcessamento?: Date;
  dataCriacao: Date;
  observacoes?: string;
}

interface ConfiguracoesSaque {
  aprovacaoAutomatica: boolean;
  horarioAprovacao: string;
  diasPermitidos: string[];
  horarioInicioSaque: string;
  horarioFimSaque: string;
  limiteDiario: number;
  valorMinimoSaque: number;
  taxaPercentual: number;
}

export function Saidas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [metodoFilter, setMetodoFilter] = useState<string>("todos");
  const [configOpen, setConfigOpen] = useState(false);

  const [saidas, setSaidas] = useState<Saida[]>([
    {
      id: "1",
      usuarioId: "101",
      nomeUsuario: "João Silva",
      emailUsuario: "joao@email.com",
      metodo: "pix",
      valorSolicitado: 500.00,
      valorTaxa: 45.00,
      valorLiquido: 455.00,
      chavePix: "joao@email.com",
      nomeTitular: "João Silva",
      documentoTitular: "123.456.789-00",
      codigoReferencia: "SAQ001",
      status: "pendente",
      dataCriacao: new Date("2025-01-15T14:30:00"),
    },
    {
      id: "2",
      usuarioId: "102",
      nomeUsuario: "Maria Santos",
      emailUsuario: "maria@email.com",
      metodo: "pix",
      valorSolicitado: 1000.00,
      valorTaxa: 90.00,
      valorLiquido: 910.00,
      chavePix: "maria@email.com",
      nomeTitular: "Maria Santos",
      documentoTitular: "987.654.321-00",
      codigoReferencia: "SAQ002",
      status: "pendente",
      dataCriacao: new Date("2025-01-15T16:15:00"),
    },
    {
      id: "3",
      usuarioId: "103",
      nomeUsuario: "Pedro Oliveira",
      emailUsuario: "pedro@email.com",
      metodo: "pix",
      valorSolicitado: 250.00,
      valorTaxa: 22.50,
      valorLiquido: 227.50,
      chavePix: "+5511999999999",
      nomeTitular: "Pedro Oliveira",
      documentoTitular: "111.222.333-44",
      codigoReferencia: "SAQ003",
      status: "aprovado",
      dataProcessamento: new Date("2025-01-15T11:00:00"),
      dataCriacao: new Date("2025-01-15T10:30:00"),
    },
    {
      id: "4",
      usuarioId: "104",
      nomeUsuario: "Ana Costa",
      emailUsuario: "ana@email.com",
      metodo: "pix",
      valorSolicitado: 750.00,
      valorTaxa: 67.50,
      valorLiquido: 682.50,
      chavePix: "12345678901",
      nomeTitular: "Ana Costa",
      documentoTitular: "555.666.777-88",
      codigoReferencia: "SAQ004",
      status: "rejeitado",
      dataCriacao: new Date("2025-01-14T13:45:00"),
      observacoes: "Dados bancários inconsistentes",
    },
  ]);

  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesSaque>({
    aprovacaoAutomatica: false,
    horarioAprovacao: "10:00",
    diasPermitidos: ["segunda", "terca", "quarta", "quinta", "sexta"],
    horarioInicioSaque: "08:00",
    horarioFimSaque: "18:00",
    limiteDiario: 3,
    valorMinimoSaque: 37.00,
    taxaPercentual: 9.00,
  });

  const filteredSaidas = saidas.filter((saida) => {
    const matchesSearch = 
      saida.nomeUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saida.emailUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saida.codigoReferencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saida.nomeTitular.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "todos" || saida.status === statusFilter;
    const matchesMetodo = metodoFilter === "todos" || saida.metodo === metodoFilter;

    return matchesSearch && matchesStatus && matchesMetodo;
  });

  const handleAprovarSaida = (saidaId: string) => {
    setSaidas(prev => prev.map(saida => 
      saida.id === saidaId 
        ? { ...saida, status: "aprovado", dataProcessamento: new Date() }
        : saida
    ));
  };

  const handleRejeitarSaida = (saidaId: string) => {
    setSaidas(prev => prev.map(saida => 
      saida.id === saidaId 
        ? { ...saida, status: "rejeitado", dataProcessamento: new Date() }
        : saida
    ));
  };

  const handleAprovacaoAutomatica = () => {
    const agora = new Date();
    const horaAtual = agora.getHours().toString().padStart(2, '0') + ':' + agora.getMinutes().toString().padStart(2, '0');
    
    // Verifica se está dentro do horário configurado
    const dentroDoHorario = horaAtual >= configuracoes.horarioInicioSaque && horaAtual <= configuracoes.horarioFimSaque;
    
    if (dentroDoHorario) {
      // Aprovação automática imediata para saques dentro do horário
      const pendentes = saidas.filter(saida => saida.status === "pendente");
      setSaidas(prev => prev.map(saida => 
        saida.status === "pendente" 
          ? { ...saida, status: "aprovado", dataProcessamento: new Date() }
          : saida
      ));
      alert(`${pendentes.length} saques aprovados automaticamente!`);
    } else {
      // Aprovação gradual de alguns pendentes
      const pendentes = saidas.filter(saida => saida.status === "pendente");
      const quantidadeParaAprovar = Math.min(3, pendentes.length); // Aprova até 3 por vez
      
      setSaidas(prev => {
        let aprovados = 0;
        return prev.map(saida => {
          if (saida.status === "pendente" && aprovados < quantidadeParaAprovar) {
            aprovados++;
            return { ...saida, status: "aprovado", dataProcessamento: new Date() };
          }
          return saida;
        });
      });
      
      alert(`${quantidadeParaAprovar} saques aprovados gradualmente!`);
    }
  };

  const getStatusBadge = (status: Saida['status']) => {
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

  const getMetodoBadge = (metodo: Saida['metodo']) => {
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

  const totalSaidas = saidas.reduce((acc, saida) => acc + saida.valorLiquido, 0);
  const saidasPendentes = saidas.filter(saida => saida.status === "pendente").length;
  const saidasAprovadas = saidas.filter(saida => saida.status === "aprovado").length;

  const diasSemana = [
    { id: "segunda", label: "Segunda" },
    { id: "terca", label: "Terça" },
    { id: "quarta", label: "Quarta" },
    { id: "quinta", label: "Quinta" },
    { id: "sexta", label: "Sexta" },
    { id: "sabado", label: "Sábado" },
    { id: "domingo", label: "Domingo" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Saídas Financeiras</h1>
          <p className="text-foreground-secondary">
            Gerencie todos os saques e saídas do sistema
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={configOpen} onOpenChange={setConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Configurações de Saque</DialogTitle>
                <DialogDescription>
                  Configure as regras para aprovação e processamento de saques
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Aprovação Automática */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Aprovação Automática</h3>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="aprovacao-automatica"
                      checked={configuracoes.aprovacaoAutomatica}
                      onCheckedChange={(checked) => 
                        setConfiguracoes(prev => ({ ...prev, aprovacaoAutomatica: checked }))
                      }
                    />
                    <Label htmlFor="aprovacao-automatica">Ativar aprovação automática</Label>
                  </div>
                  
                  {configuracoes.aprovacaoAutomatica && (
                    <div className="space-y-2">
                      <Label htmlFor="horario-aprovacao">Horário da aprovação automática</Label>
                      <Input
                        id="horario-aprovacao"
                        type="time"
                        value={configuracoes.horarioAprovacao}
                        onChange={(e) => 
                          setConfiguracoes(prev => ({ ...prev, horarioAprovacao: e.target.value }))
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Horários Permitidos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Horários Permitidos</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="horario-inicio">Horário de início</Label>
                      <Input
                        id="horario-inicio"
                        type="time"
                        value={configuracoes.horarioInicioSaque}
                        onChange={(e) => 
                          setConfiguracoes(prev => ({ ...prev, horarioInicioSaque: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="horario-fim">Horário de fim</Label>
                      <Input
                        id="horario-fim"
                        type="time"
                        value={configuracoes.horarioFimSaque}
                        onChange={(e) => 
                          setConfiguracoes(prev => ({ ...prev, horarioFimSaque: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Dias Permitidos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dias Permitidos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {diasSemana.map((dia) => (
                      <div key={dia.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={dia.id}
                          checked={configuracoes.diasPermitidos.includes(dia.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setConfiguracoes(prev => ({
                                ...prev,
                                diasPermitidos: [...prev.diasPermitidos, dia.id]
                              }));
                            } else {
                              setConfiguracoes(prev => ({
                                ...prev,
                                diasPermitidos: prev.diasPermitidos.filter(d => d !== dia.id)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={dia.id}>{dia.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Configurações Financeiras */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configurações Financeiras</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valor-minimo">Valor mínimo (R$)</Label>
                      <Input
                        id="valor-minimo"
                        type="number"
                        step="0.01"
                        value={configuracoes.valorMinimoSaque}
                        onChange={(e) => 
                          setConfiguracoes(prev => ({ ...prev, valorMinimoSaque: parseFloat(e.target.value) }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxa-percentual">Taxa (%)</Label>
                      <Input
                        id="taxa-percentual"
                        type="number"
                        step="0.01"
                        value={configuracoes.taxaPercentual}
                        onChange={(e) => 
                          setConfiguracoes(prev => ({ ...prev, taxaPercentual: parseFloat(e.target.value) }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="limite-diario">Limite diário de saques</Label>
                    <Input
                      id="limite-diario"
                      type="number"
                      value={configuracoes.limiteDiario}
                      onChange={(e) => 
                        setConfiguracoes(prev => ({ ...prev, limiteDiario: parseInt(e.target.value) }))
                      }
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setConfigOpen(false)}>Salvar Configurações</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleAprovacaoAutomatica} className="bg-success hover:bg-success/90">
            <Zap className="h-4 w-4 mr-2" />
            Aprovação Automática
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-danger/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-danger" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Total de Saídas</p>
              <p className="text-2xl font-bold text-foreground">
                R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
              <p className="text-sm text-foreground-secondary">Saques Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{saidasPendentes}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-foreground-secondary">Saques Aprovados</p>
              <p className="text-2xl font-bold text-foreground">{saidasAprovadas}</p>
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
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tabela de Saídas */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Lista de Saques ({filteredSaidas.length})
          </h2>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Valor do Saque</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSaidas.map((saida) => (
                  <TableRow key={saida.id}>
                    <TableCell>
                      <p className="font-mono text-foreground text-lg font-semibold">
                        R$ {saida.valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </TableCell>
                    <TableCell>
                      <code className="bg-background-secondary px-2 py-1 rounded text-xs">
                        {saida.codigoReferencia}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{format(saida.dataCriacao, "dd/MM/yyyy", { locale: ptBR })}</p>
                        <p className="text-xs text-foreground-secondary">
                          {format(saida.dataCriacao, "HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(saida.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {saida.status === "pendente" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAprovarSaida(saida.id)}
                              className="text-success border-success hover:bg-success hover:text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejeitarSaida(saida.id)}
                              className="text-danger border-danger hover:bg-danger hover:text-white"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
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