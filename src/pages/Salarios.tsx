import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, Users, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SalaryRequest {
  id: number;
  employee: string;
  position: string;
  currentSalary: number;
  requestedSalary: number;
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

interface SalaryLevel {
  id: number;
  name: string;
  minPeople: number;
  currentPeople: number;
  salary: number;
  totalCost: number;
}

const mockRequests: SalaryRequest[] = [
  {
    id: 1,
    employee: "João Silva",
    position: "Desenvolvedor Frontend",
    currentSalary: 5000,
    requestedSalary: 6000,
    reason: "Aumento por mérito e novas responsabilidades",
    date: "2024-01-15",
    status: "pending"
  },
  {
    id: 2,
    employee: "Maria Santos",
    position: "Designer UX/UI",
    currentSalary: 4500,
    requestedSalary: 5200,
    reason: "Especialização em novas ferramentas",
    date: "2024-01-10",
    status: "approved"
  }
];

const mockLevels: SalaryLevel[] = [
  {
    id: 1,
    name: "Desenvolvedor Junior",
    minPeople: 3,
    currentPeople: 2,
    salary: 3500,
    totalCost: 7000
  },
  {
    id: 2,
    name: "Desenvolvedor Pleno",
    minPeople: 2,
    currentPeople: 3,
    salary: 6000,
    totalCost: 18000
  }
];

export default function Salarios() {
  const [requests] = useState<SalaryRequest[]>(mockRequests);
  const [levels, setLevels] = useState<SalaryLevel[]>(mockLevels);
  const [isCreateLevelOpen, setIsCreateLevelOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateLevel = (formData: FormData) => {
    const name = formData.get("name") as string;
    const minPeople = parseInt(formData.get("minPeople") as string);
    const salary = parseFloat(formData.get("salary") as string);

    const newLevel: SalaryLevel = {
      id: levels.length + 1,
      name,
      minPeople,
      currentPeople: 0,
      salary,
      totalCost: 0
    };

    setLevels([...levels, newLevel]);
    setIsCreateLevelOpen(false);
    toast({
      title: "Nível criado",
      description: "Novo nível salarial foi criado com sucesso"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aprovado</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const totalTeamCost = levels.reduce((total, level) => total + level.totalCost, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Salários</h1>
          <p className="text-muted-foreground">Gerencie solicitações e níveis salariais da equipe</p>
        </div>
        
        <Dialog open={isCreateLevelOpen} onOpenChange={setIsCreateLevelOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Nível
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Nível Salarial</DialogTitle>
              <DialogDescription>
                Configure um novo nível salarial para a equipe
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateLevel(formData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Nível</Label>
                <Input id="name" name="name" placeholder="Ex: Desenvolvedor Senior" required />
              </div>
              <div>
                <Label htmlFor="minPeople">Mínimo de Pessoas</Label>
                <Input id="minPeople" name="minPeople" type="number" min="1" placeholder="3" required />
              </div>
              <div>
                <Label htmlFor="salary">Salário Individual (R$)</Label>
                <Input id="salary" name="salary" type="number" step="0.01" placeholder="5000.00" required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateLevelOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Criar Nível</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Total da Equipe</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalTeamCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Por mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solicitações Pendentes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter(r => r.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Níveis Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{levels.length}</div>
            <p className="text-xs text-muted-foreground">Níveis configurados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{levels.reduce((total, level) => total + level.currentPeople, 0)}</div>
            <p className="text-xs text-muted-foreground">Ativos na folha</p>
          </CardContent>
        </Card>
      </div>

      {/* Salary Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Solicitações de Aumento</CardTitle>
          <CardDescription>Pedidos de ajuste salarial da equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{request.employee}</span>
                    <span className="text-sm text-muted-foreground">• {request.position}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    R$ {request.currentSalary.toLocaleString()} → R$ {request.requestedSalary.toLocaleString()}
                  </div>
                  <div className="text-sm">{request.reason}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{request.date}</span>
                  {getStatusBadge(request.status)}
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                        Aprovar
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Rejeitar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis Salariais</CardTitle>
          <CardDescription>Configuração dos níveis e custos da equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {levels.map((level) => (
              <div key={level.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{level.name}</h3>
                  <Badge variant={level.currentPeople >= level.minPeople ? "default" : "secondary"}>
                    {level.currentPeople >= level.minPeople ? "Completo" : "Incompleto"}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pessoas:</span>
                    <span>{level.currentPeople}/{level.minPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salário:</span>
                    <span>R$ {level.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Custo Total:</span>
                    <span>R$ {level.totalCost.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min((level.currentPeople / level.minPeople) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}