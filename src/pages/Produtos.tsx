import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, Edit, Trash2, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Produto {
  id: number;
  titulo: string;
  categoria: string;
  codigo: string;
  valorMinimo: number;
  valorMaximo?: number;
  rendimentoDiario: number;
  duracaoDias: number;
  vendidos: number;
  limite?: number;
  status: 'ativo' | 'inativo' | 'manutencao';
  dataInicio?: string;
  dataFim?: string;
}

export default function Produtos() {
  const { toast } = useToast();
  
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: 1,
      titulo: "Robô IA Básico",
      categoria: "robo-ia",
      codigo: "RIA001",
      valorMinimo: 100.00,
      valorMaximo: 1000.00,
      rendimentoDiario: 2.5,
      duracaoDias: 30,
      vendidos: 45,
      limite: 100,
      status: "ativo",
      dataInicio: "2024-01-01"
    },
    {
      id: 2,
      titulo: "Robô IA Premium",
      categoria: "robo-ia",
      codigo: "RIA002",
      valorMinimo: 500.00,
      valorMaximo: 5000.00,
      rendimentoDiario: 3.2,
      duracaoDias: 45,
      vendidos: 28,
      limite: 50,
      status: "ativo",
      dataInicio: "2024-01-01"
    },
    {
      id: 3,
      titulo: "Robô IA VIP",
      categoria: "robo-ia",
      codigo: "RIA003",
      valorMinimo: 1000.00,
      rendimentoDiario: 4.0,
      duracaoDias: 60,
      vendidos: 12,
      limite: 25,
      status: "manutencao",
      dataInicio: "2024-01-01"
    }
  ]);

  const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const handleSalvarProduto = () => {
    if (produtoEdicao) {
      if (produtoEdicao.id === 0) {
        // Novo produto
        setProdutos([...produtos, { ...produtoEdicao, id: Date.now() }]);
        toast({
          title: "Produto criado",
          description: "O produto foi criado com sucesso!",
        });
      } else {
        // Editar produto
        setProdutos(produtos.map(p => p.id === produtoEdicao.id ? produtoEdicao : p));
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso!",
        });
      }
      setModalAberto(false);
      setProdutoEdicao(null);
    }
  };

  const handleExcluirProduto = (id: number) => {
    setProdutos(produtos.filter(p => p.id !== id));
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso!",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge variant="default">Ativo</Badge>;
      case 'inativo':
        return <Badge variant="secondary">Inativo</Badge>;
      case 'manutencao':
        return <Badge variant="destructive">Manutenção</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalProdutos = produtos.length;
  const produtosAtivos = produtos.filter(p => p.status === 'ativo').length;
  const totalVendidos = produtos.reduce((sum, p) => sum + p.vendidos, 0);
  const rendimentoMedio = produtos.reduce((sum, p) => sum + p.rendimentoDiario, 0) / produtos.length;

  const novoProduto = () => {
    setProdutoEdicao({
      id: 0,
      titulo: '',
      categoria: 'robo-ia',
      codigo: '',
      valorMinimo: 0,
      rendimentoDiario: 0,
      duracaoDias: 30,
      vendidos: 0,
      status: 'ativo'
    });
    setModalAberto(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Package className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Produtos de Investimento</h1>
            <p className="text-muted-foreground">Gerencie produtos, rendimentos e vendas</p>
          </div>
        </div>
        <Button onClick={novoProduto}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Produtos</p>
                <p className="text-2xl font-bold">{totalProdutos}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos Ativos</p>
                <p className="text-2xl font-bold text-green-600">{produtosAtivos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendidos</p>
                <p className="text-2xl font-bold text-blue-600">{totalVendidos}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rendimento Médio</p>
                <p className="text-2xl font-bold text-purple-600">{rendimentoMedio.toFixed(1)}%</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos</CardTitle>
          <CardDescription>
            Gerencie todos os produtos de investimento da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Valor Mínimo</TableHead>
                <TableHead>Rendimento/Dia</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Vendidos</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{produto.titulo}</div>
                      <div className="text-sm text-muted-foreground capitalize">{produto.categoria}</div>
                    </div>
                  </TableCell>
                  <TableCell>{produto.codigo}</TableCell>
                  <TableCell>R$ {produto.valorMinimo.toFixed(2)}</TableCell>
                  <TableCell>{produto.rendimentoDiario}%</TableCell>
                  <TableCell>{produto.duracaoDias} dias</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{produto.vendidos}</span>
                      {produto.limite && (
                        <span className="text-sm text-muted-foreground">/ {produto.limite}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(produto.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setProdutoEdicao(produto);
                          setModalAberto(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleExcluirProduto(produto.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {produtoEdicao?.id === 0 ? 'Novo Produto' : 'Editar Produto'}
            </DialogTitle>
            <DialogDescription>
              Configure as informações do produto de investimento
            </DialogDescription>
          </DialogHeader>
          
          {produtoEdicao && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={produtoEdicao.titulo}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, titulo: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    value={produtoEdicao.codigo}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, codigo: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="valorMinimo">Valor Mínimo</Label>
                  <Input
                    id="valorMinimo"
                    type="number"
                    value={produtoEdicao.valorMinimo}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, valorMinimo: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="valorMaximo">Valor Máximo</Label>
                  <Input
                    id="valorMaximo"
                    type="number"
                    value={produtoEdicao.valorMaximo || ''}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, valorMaximo: parseFloat(e.target.value) || undefined})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rendimentoDiario">Rendimento Diário (%)</Label>
                  <Input
                    id="rendimentoDiario"
                    type="number"
                    step="0.1"
                    value={produtoEdicao.rendimentoDiario}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, rendimentoDiario: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="duracaoDias">Duração (dias)</Label>
                  <Input
                    id="duracaoDias"
                    type="number"
                    value={produtoEdicao.duracaoDias}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, duracaoDias: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="limite">Limite de Vendas</Label>
                  <Input
                    id="limite"
                    type="number"
                    value={produtoEdicao.limite || ''}
                    onChange={(e) => setProdutoEdicao({...produtoEdicao, limite: parseInt(e.target.value) || undefined})}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={produtoEdicao.status} onValueChange={(value: any) => setProdutoEdicao({...produtoEdicao, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="manutencao">Manutenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSalvarProduto} className="flex-1">
                  Salvar Produto
                </Button>
                <Button variant="outline" onClick={() => setModalAberto(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}