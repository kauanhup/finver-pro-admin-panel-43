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
  currentLevel: string;
  requestedLevel: string;
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
    currentLevel: "Desenvolvedor Pleno",
    requestedLevel: "Desenvolvedor Senior",
    currentSalary: 5000,
    requestedSalary: 7500,
    reason: "Aumento por mérito e novas responsabilidades",
    date: "2024-01-15",
    status: "pending"
  },
  {
    id: 2,
    employee: "Maria Santos",
    position: "Designer UX/UI",
    currentLevel: "Designer Junior",
    requestedLevel: "Designer Pleno",
    currentSalary: 3500,
    requestedSalary: 5200,
    reason: "Especialização em novas ferramentas",
    date: "2024-01-10",
    status: "approved"
  },
  {
    id: 3,
    employee: "Carlos Oliveira",
    position: "Desenvolvedor Backend",
    currentLevel: "Desenvolvedor Junior",
    requestedLevel: "Desenvolvedor Pleno",
    currentSalary: 4000,
    requestedSalary: 6000,
    reason: "Conclusão de certificações e projetos",
    date: "2024-01-08",
    status: "pending"
  }
];

const mockLevels: SalaryLevel[] = [
  {
    id: 1,
    name: "Desenvolvedor Junior (A)",
    minPeople: 3,
    currentPeople: 4,
    salary: 3500,
    totalCost: 14000
  },
  {
    id: 2,
    name: "Desenvolvedor Pleno (B)",
    minPeople: 2,
    currentPeople: 5,
    salary: 6000,
    totalCost: 30000
  },
  {
    id: 3,
    name: "Desenvolvedor Senior (C)",
    minPeople: 1,
    currentPeople: 2,
    salary: 9000,
    totalCost: 18000
  },
  {
    id: 4,
    name: "Designer Junior (A)",
    minPeople: 2,
    currentPeople: 3,
    salary: 3200,
    totalCost: 9600
  },
  {
    id: 5,
    name: "Designer Pleno (B)",
    minPeople: 1,
    currentPeople: 2,
    salary: 5500,
    totalCost: 11000
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
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gestão de Salários</h1>
          <p className="text-muted-foreground">Gerencie solicitações e níveis salariais</p>
        </div>
        
        <Dialog open={isCreateLevelOpen} onOpenChange={setIsCreateLevelOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Criar Nível
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-md">
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

      {/* Salary Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Solicitações de Aumento
          </CardTitle>
          <CardDescription>Pedidos de ajuste salarial da equipe</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex flex-col lg:flex-row gap-4 p-4 border rounded-lg">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-medium text-lg">{request.employee}</span>
                    <span className="text-sm text-muted-foreground">• {request.position}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium">Atual:</span>
                      <Badge variant="outline" className="w-fit">{request.currentLevel}</Badge>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground">→</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium">Solicitado:</span>
                      <Badge className="w-fit bg-primary/10 text-primary border-primary/20">{request.requestedLevel}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-medium">
                    <span>R$ {request.currentSalary.toLocaleString()}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>R$ {request.requestedSalary.toLocaleString()}</span>
                    <span className="text-green-600">
                      (+R$ {(request.requestedSalary - request.currentSalary).toLocaleString()})
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {request.reason}
                  </p>
                </div>
                
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2 justify-between lg:justify-start">
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
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Níveis Salariais
          </CardTitle>
          <CardDescription>Configuração dos níveis e custos da equipe</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Team Summary */}
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
            <h4 className="font-medium mb-3">Resumo da Equipe por Nível</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {levels.filter(level => level.name.includes("(A)")).reduce((sum, level) => sum + level.currentPeople, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Nível A (Junior)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-foreground">
                  {levels.filter(level => level.name.includes("(B)")).reduce((sum, level) => sum + level.currentPeople, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Nível B (Pleno)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-foreground">
                  {levels.filter(level => level.name.includes("(C)")).reduce((sum, level) => sum + level.currentPeople, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Nível C (Senior)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {levels.map((level) => (
              <div key={level.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <h3 className="font-medium text-sm lg:text-base">{level.name}</h3>
                  <div className="flex gap-2 flex-wrap">
                    {level.name.includes("(A)") && <Badge variant="secondary">A</Badge>}
                    {level.name.includes("(B)") && <Badge variant="secondary">B</Badge>}
                    {level.name.includes("(C)") && <Badge variant="secondary">C</Badge>}
                    <Badge variant={level.currentPeople >= level.minPeople ? "default" : "outline"}>
                      {level.currentPeople >= level.minPeople ? "Completo" : "Incompleto"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pessoas:</span>
                    <span className="font-medium">{level.currentPeople}/{level.minPeople}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Salário:</span>
                    <span>R$ {level.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
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