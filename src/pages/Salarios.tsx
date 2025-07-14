import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, DollarSign, Users, TrendingUp, Calendar, Edit, Trash2, Check, X } from "lucide-react";
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
  description: string;
  targetValue: number;
  bonus: number;
  peopleAchieved: number;
  monthlyGoal: string;
}

const mockRequests: SalaryRequest[] = [
  {
    id: 1,
    employee: "João Silva",
    position: "Desenvolvedor Frontend",
    currentSalary: 0,
    requestedSalary: 5000,
    reason: "Definição de salário base para novo contratado",
    date: "2024-01-15",
    status: "pending"
  },
  {
    id: 2,
    employee: "Maria Santos",
    position: "Designer UX/UI",
    currentSalary: 3500,
    requestedSalary: 4200,
    reason: "Ajuste salarial conforme performance",
    date: "2024-01-10",
    status: "approved"
  },
  {
    id: 3,
    employee: "Carlos Oliveira",
    position: "Desenvolvedor Backend",
    currentSalary: 4000,
    requestedSalary: 4800,
    reason: "Revisão salarial anual",
    date: "2024-01-08",
    status: "pending"
  }
];

const mockLevels: SalaryLevel[] = [
  {
    id: 1,
    name: "Nível Bronze (A)",
    description: "Meta de vendas/entregas básica",
    targetValue: 10000,
    bonus: 500,
    peopleAchieved: 8,
    monthlyGoal: "R$ 10.000 em vendas"
  },
  {
    id: 2,
    name: "Nível Prata (B)", 
    description: "Meta intermediária de performance",
    targetValue: 25000,
    bonus: 1200,
    peopleAchieved: 5,
    monthlyGoal: "R$ 25.000 em vendas"
  },
  {
    id: 3,
    name: "Nível Ouro (C)",
    description: "Meta avançada de excelência",
    targetValue: 50000,
    bonus: 2500,
    peopleAchieved: 2,
    monthlyGoal: "R$ 50.000 em vendas"
  },
  {
    id: 4,
    name: "Nível Diamante (D)",
    description: "Meta elite de performance",
    targetValue: 100000,
    bonus: 5000,
    peopleAchieved: 1,
    monthlyGoal: "R$ 100.000 em vendas"
  }
];

export default function Salarios() {
  const [requests, setRequests] = useState<SalaryRequest[]>(mockRequests);
  const [levels, setLevels] = useState<SalaryLevel[]>(mockLevels);
  const [isCreateLevelOpen, setIsCreateLevelOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<SalaryLevel | null>(null);
  const { toast } = useToast();

  const handleCreateLevel = (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const targetValue = parseFloat(formData.get("targetValue") as string);
    const bonus = parseFloat(formData.get("bonus") as string);
    const monthlyGoal = formData.get("monthlyGoal") as string;

    const newLevel: SalaryLevel = {
      id: levels.length + 1,
      name,
      description,
      targetValue,
      bonus,
      peopleAchieved: 0,
      monthlyGoal
    };

    setLevels([...levels, newLevel]);
    setIsCreateLevelOpen(false);
    toast({
      title: "Nível criado",
      description: "Novo nível de meta foi criado com sucesso"
    });
  };

  const handleEditLevel = (formData: FormData) => {
    if (!editingLevel) return;
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const targetValue = parseFloat(formData.get("targetValue") as string);
    const bonus = parseFloat(formData.get("bonus") as string);
    const monthlyGoal = formData.get("monthlyGoal") as string;

    setLevels(levels.map(level => 
      level.id === editingLevel.id 
        ? { ...level, name, description, targetValue, bonus, monthlyGoal }
        : level
    ));
    setEditingLevel(null);
    toast({
      title: "Nível atualizado",
      description: "Nível de meta foi atualizado com sucesso"
    });
  };

  const handleDeleteLevel = (levelId: number) => {
    setLevels(levels.filter(level => level.id !== levelId));
    toast({
      title: "Nível excluído",
      description: "Nível de meta foi removido com sucesso"
    });
  };

  const handleRequestAction = (requestId: number, action: "approved" | "rejected") => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: action }
        : request
    ));
    toast({
      title: action === "approved" ? "Solicitação aprovada" : "Solicitação rejeitada",
      description: `A solicitação foi ${action === "approved" ? "aprovada" : "rejeitada"} com sucesso`
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

  const totalBonusPaid = levels.reduce((total, level) => total + (level.bonus * level.peopleAchieved), 0);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gestão de Salários</h1>
          <p className="text-muted-foreground">Gerencie solicitações salariais e níveis de metas</p>
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
              <DialogTitle>Criar Novo Nível de Meta</DialogTitle>
              <DialogDescription>
                Configure um novo nível de meta mensal para bonificação
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateLevel(formData);
            }} className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Nível</Label>
                <Input id="name" name="name" placeholder="Ex: Nível Ouro" required />
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" name="description" placeholder="Meta de performance avançada" required />
              </div>
              <div>
                <Label htmlFor="targetValue">Meta (R$)</Label>
                <Input id="targetValue" name="targetValue" type="number" step="0.01" placeholder="25000.00" required />
              </div>
              <div>
                <Label htmlFor="bonus">Bônus (R$)</Label>
                <Input id="bonus" name="bonus" type="number" step="0.01" placeholder="1200.00" required />
              </div>
              <div>
                <Label htmlFor="monthlyGoal">Descrição da Meta</Label>
                <Input id="monthlyGoal" name="monthlyGoal" placeholder="R$ 25.000 em vendas" required />
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
            Solicitações de Salário
          </CardTitle>
          <CardDescription>Pedidos de definição e ajuste salarial</CardDescription>
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
                      <span className="text-muted-foreground font-medium">Salário atual:</span>
                      <span className="font-medium">
                        {request.currentSalary > 0 ? `R$ ${request.currentSalary.toLocaleString()}` : "Não definido"}
                      </span>
                    </div>
                    <span className="hidden sm:inline text-muted-foreground">→</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-muted-foreground font-medium">Salário solicitado:</span>
                      <span className="font-medium text-primary">R$ {request.requestedSalary.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {request.currentSalary > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm font-medium">
                      <span className="text-muted-foreground">Diferença:</span>
                      <span className={request.requestedSalary > request.currentSalary ? "text-green-600" : "text-red-600"}>
                        {request.requestedSalary > request.currentSalary ? "+" : ""}
                        R$ {(request.requestedSalary - request.currentSalary).toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                    {request.reason}
                  </p>
                </div>
                
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2 justify-between lg:justify-start">
                  <span className="text-sm text-muted-foreground">{request.date}</span>
                  {getStatusBadge(request.status)}
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleRequestAction(request.id, "approved")}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleRequestAction(request.id, "rejected")}
                      >
                        <X className="h-3 w-3 mr-1" />
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
            Níveis de Metas Mensais
          </CardTitle>
          <CardDescription>Níveis de performance com bonificações</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bonus Summary */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Total Bônus Pago</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  R$ {totalBonusPaid.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Bonificações mensais</p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Nível A/Bronze</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {levels.filter(level => level.name.includes("(A)") || level.name.includes("Bronze")).reduce((sum, level) => sum + level.peopleAchieved, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ {levels.filter(level => level.name.includes("(A)") || level.name.includes("Bronze")).reduce((sum, level) => sum + (level.bonus * level.peopleAchieved), 0).toLocaleString()} em bônus
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Nível B/Prata</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {levels.filter(level => level.name.includes("(B)") || level.name.includes("Prata")).reduce((sum, level) => sum + level.peopleAchieved, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ {levels.filter(level => level.name.includes("(B)") || level.name.includes("Prata")).reduce((sum, level) => sum + (level.bonus * level.peopleAchieved), 0).toLocaleString()} em bônus
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Nível C+/Ouro+</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {levels.filter(level => level.name.includes("(C)") || level.name.includes("(D)") || level.name.includes("Ouro") || level.name.includes("Diamante")).reduce((sum, level) => sum + level.peopleAchieved, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  R$ {levels.filter(level => level.name.includes("(C)") || level.name.includes("(D)") || level.name.includes("Ouro") || level.name.includes("Diamante")).reduce((sum, level) => sum + (level.bonus * level.peopleAchieved), 0).toLocaleString()} em bônus
                </p>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {levels.map((level) => (
              <div key={level.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <h3 className="font-medium text-sm lg:text-base">{level.name}</h3>
                  <div className="flex gap-2 flex-wrap items-center">
                    {level.name.includes("(A)") && <Badge variant="secondary">A</Badge>}
                    {level.name.includes("(B)") && <Badge variant="secondary">B</Badge>}
                    {level.name.includes("(C)") && <Badge variant="secondary">C</Badge>}
                    {level.name.includes("(D)") && <Badge variant="secondary">D</Badge>}
                    {level.name.includes("Bronze") && <Badge className="bg-amber-100 text-amber-800">Bronze</Badge>}
                    {level.name.includes("Prata") && <Badge className="bg-gray-100 text-gray-800">Prata</Badge>}
                    {level.name.includes("Ouro") && <Badge className="bg-yellow-100 text-yellow-800">Ouro</Badge>}
                    {level.name.includes("Diamante") && <Badge className="bg-blue-100 text-blue-800">Diamante</Badge>}
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => setEditingLevel(level)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteLevel(level.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{level.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meta:</span>
                    <span className="font-medium">R$ {level.targetValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bônus:</span>
                    <span className="font-medium text-green-600">R$ {level.bonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Alcançaram:</span>
                    <span className="font-medium">{level.peopleAchieved} pessoas</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total pago:</span>
                    <span className="text-green-600">R$ {(level.bonus * level.peopleAchieved).toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-2 bg-muted/50 rounded text-xs">
                  <span className="font-medium">Meta: </span>{level.monthlyGoal}
                </div>
              </div>
            ))}
          </div>

          {/* Edit Level Dialog */}
          <Dialog open={!!editingLevel} onOpenChange={() => setEditingLevel(null)}>
            <DialogContent className="w-[95%] max-w-md">
              <DialogHeader>
                <DialogTitle>Editar Nível de Meta</DialogTitle>
                <DialogDescription>
                  Atualize as informações do nível de meta
                </DialogDescription>
              </DialogHeader>
              {editingLevel && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleEditLevel(formData);
                }} className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name">Nome do Nível</Label>
                    <Input 
                      id="edit-name" 
                      name="name" 
                      defaultValue={editingLevel.name}
                      placeholder="Ex: Nível Ouro" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Descrição</Label>
                    <Input 
                      id="edit-description" 
                      name="description" 
                      defaultValue={editingLevel.description}
                      placeholder="Meta de performance avançada" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-targetValue">Meta (R$)</Label>
                    <Input 
                      id="edit-targetValue" 
                      name="targetValue" 
                      type="number" 
                      step="0.01" 
                      defaultValue={editingLevel.targetValue}
                      placeholder="25000.00" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-bonus">Bônus (R$)</Label>
                    <Input 
                      id="edit-bonus" 
                      name="bonus" 
                      type="number" 
                      step="0.01" 
                      defaultValue={editingLevel.bonus}
                      placeholder="1200.00" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-monthlyGoal">Descrição da Meta</Label>
                    <Input 
                      id="edit-monthlyGoal" 
                      name="monthlyGoal" 
                      defaultValue={editingLevel.monthlyGoal}
                      placeholder="R$ 25.000 em vendas" 
                      required 
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setEditingLevel(null)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Salvar Alterações</Button>
                  </div>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}