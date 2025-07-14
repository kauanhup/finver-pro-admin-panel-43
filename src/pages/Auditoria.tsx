import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle, Eye, Activity, Search, Filter } from "lucide-react";

interface LogSistema {
  id: number;
  usuario: string;
  acao: string;
  tabela: string;
  timestamp: string;
  ip: string;
  detalhes: string;
  tipo: 'info' | 'warning' | 'error' | 'success';
}

interface TentativaLogin {
  id: number;
  telefone: string;
  ip: string;
  sucesso: boolean;
  timestamp: string;
  userAgent: string;
  localizacao: string;
}

export default function Auditoria() {
  const [filtroLogs, setFiltroLogs] = useState({
    usuario: '',
    acao: 'todos',
    periodo: '7'
  });

  const [filtroLogins, setFiltroLogins] = useState({
    telefone: '',
    sucesso: 'todos',
    periodo: '7'
  });

  const [logsSistema] = useState<LogSistema[]>([
    {
      id: 1,
      usuario: "admin@admin.com",
      acao: "CRIAR_USUARIO",
      tabela: "usuarios",
      timestamp: "2024-01-15 10:30:00",
      ip: "192.168.1.100",
      detalhes: "Criou usuário João Silva",
      tipo: "success"
    },
    {
      id: 2,
      usuario: "admin@admin.com",
      acao: "APROVAR_SAQUE",
      tabela: "operacoes_financeiras",
      timestamp: "2024-01-15 10:25:00",
      ip: "192.168.1.100",
      detalhes: "Aprovou saque de R$ 150,00",
      tipo: "info"
    },
    {
      id: 3,
      usuario: "sistema",
      acao: "FALHA_PAGAMENTO",
      tabela: "operacoes_financeiras",
      timestamp: "2024-01-15 10:20:00",
      ip: "gateway.pixup.com",
      detalhes: "Falha no processamento PIX - ID: 12345",
      tipo: "error"
    },
    {
      id: 4,
      usuario: "admin@admin.com",
      acao: "EDITAR_PRODUTO",
      tabela: "produtos",
      timestamp: "2024-01-15 10:15:00",
      ip: "192.168.1.100",
      detalhes: "Editou produto Robô IA Premium",
      tipo: "info"
    },
    {
      id: 5,
      usuario: "sistema",
      acao: "TENTATIVA_ACESSO_SUSPEITO",
      tabela: "usuarios",
      timestamp: "2024-01-15 10:10:00",
      ip: "45.123.456.789",
      detalhes: "Múltiplas tentativas de login para admin",
      tipo: "warning"
    }
  ]);

  const [tentativasLogin] = useState<TentativaLogin[]>([
    {
      id: 1,
      telefone: "11999999999",
      ip: "192.168.1.50",
      sucesso: true,
      timestamp: "2024-01-15 11:00:00",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      localizacao: "São Paulo, SP"
    },
    {
      id: 2,
      telefone: "11888888888",
      ip: "192.168.1.75",
      sucesso: false,
      timestamp: "2024-01-15 10:55:00",
      userAgent: "Mozilla/5.0 (Android 10; Mobile; rv:81.0) Gecko/81.0 Firefox/81.0",
      localizacao: "Rio de Janeiro, RJ"
    },
    {
      id: 3,
      telefone: "11777777777",
      ip: "192.168.1.32",
      sucesso: true,
      timestamp: "2024-01-15 10:50:00",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
      localizacao: "Belo Horizonte, MG"
    },
    {
      id: 4,
      telefone: "admin",
      ip: "45.123.456.789",
      sucesso: false,
      timestamp: "2024-01-15 10:45:00",
      userAgent: "curl/7.68.0",
      localizacao: "Desconhecido"
    },
    {
      id: 5,
      telefone: "admin",
      ip: "45.123.456.789",
      sucesso: false,
      timestamp: "2024-01-15 10:44:00",
      userAgent: "curl/7.68.0",
      localizacao: "Desconhecido"
    }
  ]);

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'success':
        return <Badge variant="default">Sucesso</Badge>;
      case 'info':
        return <Badge variant="secondary">Info</Badge>;
      case 'warning':
        return <Badge variant="outline">Aviso</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">{tipo}</Badge>;
    }
  };

  const getSucessoBadge = (sucesso: boolean) => {
    return sucesso ? 
      <Badge variant="default">Sucesso</Badge> : 
      <Badge variant="destructive">Falha</Badge>;
  };

  const logsFiltrados = logsSistema.filter(log => {
    const matchUsuario = filtroLogs.usuario === '' || log.usuario.toLowerCase().includes(filtroLogs.usuario.toLowerCase());
    const matchAcao = filtroLogs.acao === 'todos' || log.acao.includes(filtroLogs.acao);
    return matchUsuario && matchAcao;
  });

  const loginsFiltrados = tentativasLogin.filter(login => {
    const matchTelefone = filtroLogins.telefone === '' || login.telefone.includes(filtroLogins.telefone);
    const matchSucesso = filtroLogins.sucesso === 'todos' || (filtroLogins.sucesso === 'true' ? login.sucesso : !login.sucesso);
    return matchTelefone && matchSucesso;
  });

  // Estatísticas
  const totalLogs = logsSistema.length;
  const logsErro = logsSistema.filter(log => log.tipo === 'error').length;
  const logsAviso = logsSistema.filter(log => log.tipo === 'warning').length;
  const tentativasFalha = tentativasLogin.filter(login => !login.sucesso).length;
  const tentativasSucesso = tentativasLogin.filter(login => login.sucesso).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Auditoria e Segurança</h1>
          <p className="text-muted-foreground">Monitoramento de atividades e segurança do sistema</p>
        </div>
      </div>

      {/* Resumo de Segurança */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Logs</p>
                <p className="text-2xl font-bold">{totalLogs}</p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Erros</p>
                <p className="text-2xl font-bold text-red-600">{logsErro}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avisos</p>
                <p className="text-2xl font-bold text-orange-600">{logsAviso}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Logins Sucesso</p>
                <p className="text-2xl font-bold text-green-600">{tentativasSucesso}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Logins Falha</p>
                <p className="text-2xl font-bold text-red-600">{tentativasFalha}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
          <TabsTrigger value="logins">Tentativas de Login</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          {/* Filtros para Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="usuario">Usuário</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="usuario"
                      placeholder="Filtrar por usuário..."
                      value={filtroLogs.usuario}
                      onChange={(e) => setFiltroLogs({...filtroLogs, usuario: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="acao">Ação</Label>
                  <Select value={filtroLogs.acao} onValueChange={(value) => setFiltroLogs({...filtroLogs, acao: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as ações" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas as ações</SelectItem>
                      <SelectItem value="CRIAR">Criar</SelectItem>
                      <SelectItem value="EDITAR">Editar</SelectItem>
                      <SelectItem value="EXCLUIR">Excluir</SelectItem>
                      <SelectItem value="APROVAR">Aprovar</SelectItem>
                      <SelectItem value="REJEITAR">Rejeitar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="periodo">Período</Label>
                  <Select value={filtroLogs.periodo} onValueChange={(value) => setFiltroLogs({...filtroLogs, periodo: value})}>
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
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>
                {logsFiltrados.length} registro(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Ação</TableHead>
                    <TableHead>Tabela</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logsFiltrados.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.usuario}</TableCell>
                      <TableCell>{log.acao}</TableCell>
                      <TableCell>{log.tabela}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.detalhes}</TableCell>
                      <TableCell>{getTipoBadge(log.tipo)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logins" className="space-y-4">
          {/* Filtros para Logins */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="telefone"
                      placeholder="Filtrar por telefone..."
                      value={filtroLogins.telefone}
                      onChange={(e) => setFiltroLogins({...filtroLogins, telefone: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sucesso">Status</Label>
                  <Select value={filtroLogins.sucesso} onValueChange={(value) => setFiltroLogins({...filtroLogins, sucesso: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="true">Sucesso</SelectItem>
                      <SelectItem value="false">Falha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="periodo">Período</Label>
                  <Select value={filtroLogins.periodo} onValueChange={(value) => setFiltroLogins({...filtroLogins, periodo: value})}>
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
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Tentativas de Login */}
          <Card>
            <CardHeader>
              <CardTitle>Tentativas de Login</CardTitle>
              <CardDescription>
                {loginsFiltrados.length} tentativa(s) encontrada(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>User Agent</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginsFiltrados.map((login) => (
                    <TableRow key={login.id}>
                      <TableCell>{login.timestamp}</TableCell>
                      <TableCell>{login.telefone}</TableCell>
                      <TableCell>{login.ip}</TableCell>
                      <TableCell>{login.localizacao}</TableCell>
                      <TableCell className="max-w-xs truncate">{login.userAgent}</TableCell>
                      <TableCell>{getSucessoBadge(login.sucesso)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}