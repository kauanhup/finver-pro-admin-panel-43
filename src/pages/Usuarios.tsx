import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Edit, Trash2, Users, DollarSign, RotateCcw, Filter, Download, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - Em produção viria do banco
const mockUsers: User[] = [
  { id: 1, name: "João Silva", email: "joao@email.com", balance: 1250.50, team: 15, spins: 8, status: "active", joinDate: "2025-01-15" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", balance: 750.00, team: 8, spins: 12, status: "active", joinDate: "2025-01-14" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", balance: 2100.75, team: 23, spins: 5, status: "inactive", joinDate: "2025-01-10" },
  { id: 4, name: "Ana Oliveira", email: "ana@email.com", balance: 450.25, team: 3, spins: 15, status: "active", joinDate: "2025-01-12" },
  { id: 5, name: "Carlos Mendes", email: "carlos@email.com", balance: 1800.00, team: 18, spins: 2, status: "suspended", joinDate: "2025-01-08" },
];

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  team: number;
  spins: number;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ balance: 0, spins: 0 });
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.id.toString().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({ balance: user.balance, spins: user.spins });
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    setUsers(prev => prev.map(user => 
      user.id === editingUser.id 
        ? { ...user, balance: editForm.balance, spins: editForm.spins }
        : user
    ));

    toast({
      title: "Usuário atualizado!",
      description: `${editingUser.name} foi atualizado com sucesso.`,
    });

    setEditingUser(null);
  };

  const handleDelete = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
    
    toast({
      title: "Usuário excluído!",
      description: `${user?.name} foi removido do sistema.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "inactive": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      case "suspended": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativo";
      case "inactive": return "Inativo";
      case "suspended": return "Suspenso";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Gerenciar Usuários
          </h1>
          <p className="text-text-secondary">Visualize e gerencie todos os usuários da plataforma</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border hover:bg-background-tertiary">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Total Usuários</p>
                <p className="text-2xl font-bold text-text-primary">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Usuários Ativos</p>
                <p className="text-2xl font-bold text-green-400">{users.filter(u => u.status === "active").length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Saldo Total</p>
                <p className="text-2xl font-bold text-text-primary">
                  R$ {users.reduce((sum, user) => sum + user.balance, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-background">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Total Giros</p>
                <p className="text-2xl font-bold text-text-primary">{users.reduce((sum, user) => sum + user.spins, 0)}</p>
              </div>
              <RotateCcw className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-border bg-background">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Pesquisar por ID, nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background-tertiary border-border"
              />
            </div>
            <Button variant="outline" size="default" className="border-border hover:bg-background-tertiary">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-text-primary">
            Usuários ({filteredUsers.length})
          </CardTitle>
          <CardDescription className="text-text-secondary">
            Lista de todos os usuários cadastrados na plataforma
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium text-text-secondary text-sm">ID</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Usuário</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Saldo</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Equipe</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Giros</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Status</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Data</th>
                  <th className="p-4 font-medium text-text-secondary text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-background-tertiary/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm text-primary">#{user.id}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-green-400">
                        R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-text-muted" />
                        <span className="font-medium text-text-primary">{user.team}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <RotateCcw className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-text-primary">{user.spins}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(user.status)}>
                        {getStatusText(user.status)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-text-secondary">
                        {new Date(user.joinDate).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              className="border-border hover:bg-background-tertiary"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-background border-border">
                            <DialogHeader>
                              <DialogTitle className="text-text-primary">Editar Usuário</DialogTitle>
                              <DialogDescription className="text-text-secondary">
                                Altere o saldo e giros da roleta de {editingUser?.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label className="text-text-primary">Saldo (R$)</Label>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={editForm.balance}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, balance: parseFloat(e.target.value) || 0 }))}
                                  className="bg-background-tertiary border-border text-text-primary"
                                />
                              </div>
                              <div>
                                <Label className="text-text-primary">Giros da Roleta</Label>
                                <Input
                                  type="number"
                                  value={editForm.spins}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, spins: parseInt(e.target.value) || 0 }))}
                                  className="bg-background-tertiary border-border text-text-primary"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingUser(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleSaveEdit} className="bg-gradient-primary hover:opacity-90">
                                Salvar Alterações
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="border-red-500/30 hover:bg-red-500/20 text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-background border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-text-primary">Excluir Usuário</AlertDialogTitle>
                              <AlertDialogDescription className="text-text-secondary">
                                Tem certeza que deseja excluir <strong>{user.name}</strong>? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-border hover:bg-background-tertiary">
                                Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}